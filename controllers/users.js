const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');



router.post('/', (req, res)=>{
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser)=>{
      if (createdUser) {
        console.log(createdUser);
          res.status(201).json({
            status:201,
            message: 'user created'
          });
      }else if(err){
        res.status(401).json({
          status: 401,
          message: 'registration failed!'
        });
      };
    });
  }else {
    res.status(400).json({
      status: 400,
      message: 'registration failed!'
    });
  }

});

module.exports = router
