const express = require('express')
const router = express.Router()
const recordEntry = require('./entryRoutes')
const userRoutes  = require('./userRoutes')
router.get("/" , (req , res) => {
    res.send("This api is reserved for testing ACID Transactions in MongoDB")
})


router.use('/entry' , recordEntry)
router.use('/user' , userRoutes)
module.exports = router