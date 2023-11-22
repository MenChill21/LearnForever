const express = require('express')
const router = express.Router()
const siteController=require('../app/controllers/SiteController')

router.get('/search',siteController.show)
router.get('/',siteController.input)

module.exports=router


