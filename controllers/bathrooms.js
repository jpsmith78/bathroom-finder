const express = require ('express')
const router = express.Router()
const Bathroom = require ('../models/bathrooms.js')



router.get('/',(req,res) => {
  Bathroom.find({},(err,foundBathroom) => {
    res.json(foundBathroom)
  })
})

router.post('/',(req,res) => {
  Bathroom.create(req.body,(error,createdBathroom) => {
    if(error){
      res.json(error)
    } else{
      console.log(createdBathroom);
      res.json(createdBathroom)
    }
  })
})

router.delete('/:id',(req,res) => {
  Bathroom.findByIdAndRemove(req.params.id, (error,deletedBathroom) => {
    res.json(deletedBathroom)
  })
})

router.put('/:id',(req,res) => {
  Bathroom.findByIdandUpdate(req.params.id, req.body,{
    new: true
  },(err,updatedBathroom) => {
      res.json(updatedBathroom)
  })
})

module.exports = router
