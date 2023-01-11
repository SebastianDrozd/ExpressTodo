const express = require('express')
const cors = require('cors')
const bp = require('body-parser')
const connection = require('./src/Utils/Connection')
//create the express app that will be used to start the server
const app = express()
//create a connection to mysql database
connection.connect()
//plug in the cors middleware
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors({
    origin: "*"
}))

app.use("/api/todos",require('./src/routes/todos'))


//declare a port to be used by express
const PORT = 4000
//start the server and listen to port 4001
app.listen(PORT, ()=>{
    console.log("Server running on port: ",PORT)
    
})
