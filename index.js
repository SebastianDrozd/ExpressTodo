const express = require('express')
const cors = require('cors')
const bp = require('body-parser')
const connection = require('./src/Utils/Connection')
require('dotenv').config()
const { OAuth2Client } = require('google-auth-library')
const uuid = require('uuid')
const client = new OAuth2Client(process.env.CLIENT_ID)
const jwt = require('./src/middleware/jwtmiddleware')
//create the express app that will be used to start the server
const app = express()
//create a connection to mysql database
connection.connect()
//plug in the middleware
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }))

//api controllers
app.use("/api/v1/todos",jwt,require('./src/routes/todos'))
//app.use("/",require("./src/routes/authorization"))
app.use("/api/v1/auth",require("./src/routes/auth"))
//declare a port to be used by express
const PORT = 4000
//start the server and listen to port 4001
app.listen(PORT, () => {
  console.log("Server running on port: ", PORT)

})
