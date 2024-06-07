const {signup}=require('../controller/tailor')
const{login}=require('../controller/tailor')
const{getTailorByEmail}=require('../controller/tailor')
const authenticatetoken=require('../middleware/authenticate')
const express = require('express')
const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/getTailorByEmail',getTailorByEmail);

module.exports=router