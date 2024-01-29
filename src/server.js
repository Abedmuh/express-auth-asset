require('dotenv').config();

//config
const express = require('express')
const app = express()
const connectToDatabase = require('./utils/mongoose')
const bodyParser = require('body-parser');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const path = require('path');

// route
const userRoutes = require('./routes/userRoute')
const productsRoutes = require('./routes/productsRoute')
const productListRoutes = require('./routes/productListRoute')

const corsOption = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors(corsOption))
app.use(bodyParser.json());
app.use(cookieParser());
connectToDatabase();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/product', productsRoutes)
app.use('/user', userRoutes)
app.use('/productList', productListRoutes)
app.use('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port localhost:3000`)
})