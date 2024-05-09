require('dotenv').config();

//config
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser');
const path = require('path');
const connectToDatabase = require('./utils/mongoose');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const swaggerDocument = yaml.load(fs.readFileSync('./openapi.yaml', 'utf8')); // Replace './swagger.yaml' with the path to your Swagger documentation YAML file
const mongoose = require('mongoose');

// route
const userRoutes = require('./routes/userRoute')
const productsRoutes = require('./routes/productsRoute')
const productListRoutes = require('./routes/productListRoute')
const paymentRoutes = require('./routes/paymentRoute')

const errorHandler = require('./middleware/error')

const uploadDir = path.join(__dirname, 'uploads');
const corsOption = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}

//views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors(corsOption))
app.use(cookieParser());
connectToDatabase();

let isReconnecting = false;
mongoose.connection.on('error', (error) => {
  console.error('Connection error:', error.message);
  if (!isReconnecting) {
    isReconnecting = true;
    console.log('Reconnecting in 10 seconds...');
    setTimeout(() => {
      isReconnecting = false;
      connectToDatabase();
    }, 10000);
  }
});

app.use('/uploads', express.static(uploadDir));
app.use('/product', productsRoutes)
app.use('/user', userRoutes)
app.use('/productList', productListRoutes)
app.use('/payment', paymentRoutes)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler)

app.listen(process.env.EXPOSE_PORT || 3000, () => {
  console.log(`Example app listening on port localhost:3000`)
})