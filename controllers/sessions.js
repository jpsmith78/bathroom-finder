const express = require('express')
const router = express.Router()
const Bathroom = require('../models/users.js')
const bcrypt = require ('bcrypt')



router.delete('/',(req,res) => {
  req.session.destory(() => {
    res.staus(200).json({
      status:200,
      message: 'Logout complete'
    })
  })
})

router.post('/', (req, res)=>{
    Bathroom.findOne({username:req.body.username}, (err, foundUser)=>{
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.user = foundUser
            res.status(201).json({
              status:201,
              message: 'created!'
            });
        } else {
            res.status(401).json({
              status: 401,
              message: 'unauthorized'
            });
        }
    })
})

module.exports = router;
