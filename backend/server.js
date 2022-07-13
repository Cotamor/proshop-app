import express, { json, urlencoded } from 'express'
import 'dotenv/config'
import 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

const PORT = process.env.PORT || 8000

// Connect to database
connectDB()
const app = express()

app.use(json())
app.use(urlencoded({ extended: false }))

// Routes
app.use('/api/products', productRoutes)

// middleware
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
