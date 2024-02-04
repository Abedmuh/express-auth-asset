require('dotenv').config();

//config
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser');
const path = require('path');
const connectToDatabase = require('./utils/mongoose')
const errorHandler = require('./utils/error')

// route
const userRoutes = require('./routes/userRoute')
const productsRoutes = require('./routes/productsRoute')
const productListRoutes = require('./routes/productListRoute')
const blogRoutes = require('./routes/blogRoute')

const uploadDir = path.join(__dirname, 'uploads');
const corsOption = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors(corsOption))
app.use(cookieParser());
connectToDatabase();

app.use('/uploads', express.static(uploadDir));
app.use('/product', productsRoutes)
app.use('/user', userRoutes)
app.use('/productList', productListRoutes)
app.use('/blog', blogRoutes)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.on('error', errorHandler)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port localhost:3000`)
})