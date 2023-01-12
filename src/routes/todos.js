const express = require('express')
const router = express.Router()
const connection = require('../Utils/Connection')
const uuid = require('uuid')
//       api/todos

//get all todos
router.get("/",(req,res) => {
    res.send("ok")
})

//post a todo
router.post("/",(req,res) => {
    console.log(new Date().getTime())
    const newTodo = {
        id : uuid.v4(),
        title: req.body.title,
        description: req.body.description,
        user: req.body.user
    }
    connection.query(`INSERT into TODO (id,title,description,user) values ('${newTodo.id}','${newTodo.title}','${newTodo.description}','${newTodo.user}')`)
    
    res.send(newTodo)
})

module.exports = router