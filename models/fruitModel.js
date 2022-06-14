const mongoose = require('mongoose')

const FruitSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number
    },
    count:{
        type:Number
    }
})

const Fruit = mongoose.model("Fruits" , FruitSchema)
module.exports = {Fruit}