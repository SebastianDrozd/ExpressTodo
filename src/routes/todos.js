const express = require('express')
const router = express.Router()
const connection = require('../Utils/Connection')
const uuid = require('uuid')

//get all user todos
router.get("/:user", (req, res) => {
    res.send("ok")
})

router.get("/",(req,res) => {
    res.send("Hi")
})

//post a todo
router.post("/", (req, res) => {
    console.log(req.body)
    const newTodo = {
        id: uuid.v4(),
        title: req.body.title,
        description: req.body.description,
        email: req.body.email
    }
    connection.query(`INSERT into TODO (id,title,description,user) values 
    ('${newTodo.id}','${newTodo.title}','${newTodo.description}','${newTodo.email}')`, (err, result) => {
        if (err) {
            res.status(404)
        }
    })
    res.send(newTodo)
})



module.exports = router