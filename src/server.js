const express = require('express')
const app = express()
const { connectToDatabase } = require('./utils/mongoose')
require('dotenv').config();
const userRoutes = require('./routes/userRoute')
const productsRoutes = require('./routes/productsRoute')
const bodyParser = require('body-parser');
const cors = require('cors')

const corsOption = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
}

app.use(cors(corsOption))
app.use(bodyParser.json());
connectToDatabase();

app.use(express.json())
app.use('/product', productsRoutes)
app.use('/user', userRoutes)
// app.use('/productList', productListRoutes)
app.use('/', (res) => {
  res.send('Try Another');
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port localhost:3000`)
})