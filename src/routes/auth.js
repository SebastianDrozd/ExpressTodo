const express = require('express')
const router = express.Router()
const connection = require('../Utils/Connection')
const uuid = require('uuid')
const { OAuth2Client } = require('google-auth-library')
const { generateAccessToken } = require('../Utils/TokenUtil')
const client = new OAuth2Client(process.env.CLIENT_ID)
const jwt = require('jsonwebtoken');
function generateAuthAccessToken(username,email) {
  return jwt.sign({username: username,email:email}, process.env.TOKEN_SECRET, { expiresIn: "1d" });
}
router.post("/google", async (req, res) => {
  
  let user = {}
  const { token,apiToken } = req.body
  
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  })
  const { name, email } = ticket.getPayload();
  connection.query(`Select * from user where email="${email}"`, (err, rows) => {
    if(rows.length == 0){
      console.log("no user found...creating user")
      user = { id: uuid.v4(), name: name, email: email }
      connection.query(`Insert into user(id,name,email) values ("${user.id}","${user.name}","${user.email}")`, (err, result) => {
        if (err) {
          console.log("Error in creating user")
        }
        else {
         
        }
      })
    }
    else{
      const realToken = generateAuthAccessToken(name,email)
      console.log("this is token",realToken)
      res.json({accessToken: realToken,name: name,email:email})
      
    }  
  })
})



module.exports = router