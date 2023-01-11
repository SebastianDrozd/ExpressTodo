const express = require('express')
const router = express.Router()

//       api/todos

//get all todos
router.get("/",(req,res) => {
    res.send("ok")
})

//post a todo
router.post("/",(req,res) => {
    let todo = req.body;
    console.log("Todo: ",todo)
    res.send(todo)
})

module.exports = router