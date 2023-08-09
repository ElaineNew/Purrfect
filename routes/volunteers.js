const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
  res.render('volunteers/activity')})


module.exports = router