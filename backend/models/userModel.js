import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    // loginAttempts: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },
    // lockUntil: {
    //   type: Number,
    // },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})


// For future improvement, account locking

// userSchema.virtual('isLocked').get(function () {
//   // check for a future lockUntil timestamp
//   return !!(this.lockUntil && this.lockUntil > Date.now())
// })

// userSchema.methods.incLoginAttempts = function (cb) {
//   // if we have a previous lock that has expired, restart at 1
//   if (this.lockUntil && this.lockUntil < Date.now()) {
//     return this.update(
//       { $set: { loginAttempts: 1 }, $unset: { lockUntil: 1 } },
//       cb
//     )
//   }
//   // otherwise we're incrementing
//   var updates = { $inc: { loginAttempts: 1 } }
//   // lock the account if we've reached max attempts and it's not locked already
//   if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
//     updates.$set = { lockUntil: Date.now() + LOCK_TIME }
//   }
//   return this.update(updates, cb)
// }

// // expose enum on the model, and provide an internal convenience reference
// var reasons = userSchema.statics.failedLogin = {
//   NOT_FOUND: 0,
//   PASSWORD_INCORRECT: 1,
//   MAX_ATTEMPTS: 2,
// }

// userSchema.statics.getAuthenticated = function (username, password, cb) {
//   this.findOne({ username: username }, function (err, user) {
//     if (err) return cb(err)

//     // make sure the user exists
//     if (!user) {
//       return cb(null, null, reasons.NOT_FOUND)
//     }

//     // check if the account is currently locked
//     if (user.isLocked) {
//       // just increment login attempts if account is already locked
//       return user.incLoginAttempts(function (err) {
//         if (err) return cb(err)
//         return cb(null, null, reasons.MAX_ATTEMPTS)
//       })
//     }

//     // test for a matching password
//     user.comparePassword(password, function (err, isMatch) {
//       if (err) return cb(err)

//       // check if the password was a match
//       if (isMatch) {
//         // if there's no lock or failed attempts, just return the user
//         if (!user.loginAttempts && !user.lockUntil) return cb(null, user)
//         // reset attempts and lock info
//         var updates = {
//           $set: { loginAttempts: 0 },
//           $unset: { lockUntil: 1 },
//         }
//         return user.update(updates, function (err) {
//           if (err) return cb(err)
//           return cb(null, user)
//         })
//       }

//       // password is incorrect, so increment login attempts before responding
//       user.incLoginAttempts(function (err) {
//         if (err) return cb(err)
//         return cb(null, null, reasons.PASSWORD_INCORRECT)
//       })
//     })
//   })
// }

const User = mongoose.model('User', userSchema)

export default User
