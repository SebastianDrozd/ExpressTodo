const express = require('express')
//create the express app that will be used to start the server
const app = express()









//declare a port to be used by express
const PORT = 4001
//start the server and listen to port 4001
app.listen(PORT, ()=>{
    console.log("Server running on port: ",PORT)
})