import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Mario',
    email: 'mario@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Luige',
    email: 'luige@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
