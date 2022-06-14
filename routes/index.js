const express = require('express')
const router = express.Router()
const recordEntry = require('./entryRoutes')
const userRoutes  = require('./userRoutes')
const fruitRoutes = require('./fruitRoutes')
const transactionRoutes = require('./transactionRoutes')
router.get("/" , (req , res) => {
    res.send("This api is reserved for testing ACID Transactions in MongoDB")
})


router.use('/entry' , recordEntry)
router.use('/user' , userRoutes)
router.use('/fruit' , fruitRoutes)
router.use('/transaction' , transactionRoutes)
module.exports = router