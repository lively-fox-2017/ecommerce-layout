const express = require('express')
const router = express.Router()
const ecomm = require('../controllers/ecommerceCont')

router.get('/', ecomm.getAll)
router.post('/submit', ecomm.createItem)
router.post('/finalprice', ecomm.createFinalPrice)

module.exports = router
