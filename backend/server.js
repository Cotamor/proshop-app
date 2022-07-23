import path from 'path'
import express from 'express'
import 'dotenv/config'
import 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

const PORT = process.env.PORT || 8000

// Connect to database
connectDB()
const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
// for ES6 need to mimic
// uploads folder not accessible by default, to make it static the code below
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// middleware
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
