const express = require('express');
const router = express.Router()
const Cloth = require('../controllers/cloth')

router.get('/admin', Cloth.getDataAdmin)

router.get('/', Cloth.getData)

router.get('/:_id', Cloth.getDataById)

router.post('/', Cloth.saveData)

module.exports = router
