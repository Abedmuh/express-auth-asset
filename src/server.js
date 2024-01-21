const express = require('express')
const app = express()
const { connectToDatabase} = require('./utils/mongoose')
const productsRoutes = require('./routes/productsRoute')

connectToDatabase();

app.use(express.json())
app.use('/', productsRoutes )

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port localhost:3000`)
})