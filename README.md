# Express Auth Asset

Express auth asset was made for complete path of backend developer. here the method was used on this project

- MVC (Model-View-Controller)
- Auth
- CRUD database
- Postman
- 3rd Party modules
- Middleware
- unit test
- +Chacing
- +Message Broker
- +Containerization

\*+ was microservice add ons

# what this app doing?

So the app just shop website can buy and sell, u have seller and buyer.
as admin u can do any and has responsibility create dev blogs
as super user u can see dashboard and get analitycs what was trending on this app (this one will be hard)
as seller u can sell some product and get all access same as user.
as buyer u only can buy and add whishlist

# File Structure Description

- controller = handling request
- middleware = handling middleware, so before enter the request or after leaving respon app will visit here before next method
- utils = handling extra stuff that can be put on main server but cuz it too big we decide put here
- model = a model for mongodb

# Plugin description

- bycrypt = hash password
- cors = middleware to limit access who can access this app(what we url this app serve)
- dotenv = connect to file .env access private variable
- multer = uploads file
- mongoose = connect to database
- express = main framework
- jsonwebtoken = auth method using Oath2.0
- cookie-parser = read cookie
- body-parser = parsing-body
- nodemon = tools for dev, easy to npm run
- faker = generate data

# list of unsolved problem

- MultiRole Feature
  as its name, in this project implanning every user has tier role. some user can access
  feature and some user cant access feature
- Data seeder
  create dummy data

### list of unsolved feature

- Caching
- Message Broker

### problem i face rn

3rd party request

- export file as csv, excel, image,any
- seedeing dastabase
- analitycs
- the data i use for add product list should i read the body or params or cookie
  rn im using cookie and params
