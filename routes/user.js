const {signup}=require('../controller/user')
const{log}=require('../controller/user')
const authenticatetoken=require('../middleware/authenticate')
const express = require('express')
const router = express.Router()

router.post('/signup',signup)
router.post('/login',log)

module.exports=router