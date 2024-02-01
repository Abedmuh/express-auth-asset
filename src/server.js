require('dotenv').config();

//config
const express = require('express')
const app = express()
const connectToDatabase = require('./utils/mongoose')
const bodyParser = require('body-parser');
const cors = require('cors')
const cookieParser = require('cookie-parser');

// route
const userRoutes = require('./routes/userRoute')
const productsRoutes = require('./routes/productsRoute')
const productListRoutes = require('./routes/productListRoute')
const blogRoutes = require('./routes/blogRoute')

const corsOption = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
}

app.use(cors(corsOption))
app.use(bodyParser.json());
app.use(cookieParser());
connectToDatabase();

app.use(express.json())
app.use('/product', productsRoutes)
app.use('/user', userRoutes)
app.use('/productList', productListRoutes)
app.use('/blog', blogRoutes)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port localhost:3000`)
})