const express = require('express')
const router = express.Router()
const {addFruit} = require('../controllers/fruitController')

router.post('/addfruit' , addFruit)
module.exports = router