const express = require('express')
const app = express()
const { connectToDatabase} = require('./utils/mongoose')
const productsRoutes = require('./routes/productsRoute')
const userRoutes = require('./routes/userRoute')
require('dotenv').config();

connectToDatabase();

app.use(express.json())
app.use('/product', productsRoutes )
app.use('/user', userRoutes )
app.use('/', (res) => {
  res.send('Try Another');
} )

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port localhost:3000`)
})