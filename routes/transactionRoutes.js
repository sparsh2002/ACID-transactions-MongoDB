const express = require('express')
const router = express.Router()
const {addFruitToBasket} = require('../controllers/transactionController')

router.post('/addfruittobasket' , addFruitToBasket)

module.exports = router