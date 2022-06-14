const { Fruit } = require("../models/fruitModel")

let fruits

const injectFruitDB = async (conn) =>{
    if(fruits){
        return 
    }
    try {
        fruits = await conn.db('acid').collection("fruits")
    } catch (e) {
        console.error(`Unable to establish collection handles in fruitsDAO: ${e}`)
    }
}

const addFruit = async (req , res) =>{
    try {
        const fruit = new Fruit(req.body)
        await fruits.insertOne(fruit).then(()=>{
            console.log('fruit inserted')
        }).then(()=>{
            res.status(201).json({message:'Success'})
        }).catch(e=>{
            res.status(400).json({error:e.message})
        })
        
    } catch (e) {
        res.status(500).json({message:'server eroror'})
    }
}


module.exports = {addFruit,injectFruitDB}