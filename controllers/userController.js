const {User}  = require('../models/userModel')
let users
const injectUserDB = async (conn) =>{
    if(users){
        return 
    }
    try {
        users = await conn.db('acid').collection("users")
    } catch (e) {
        console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
} 
 
const addUser = async(req , res) =>{
    try {
        const user = new User(req.body)
        await users.insertOne(user).then(()=>{
            console.log('user inserted')
        }).then(()=>{
            res.status(201).json({message:'Success'})
        }).catch(e=>{
            res.status(400).json({error:e.message})
        })
        
    } catch (e) {
        res.status(500).json({message:'server eroror'})
    }
}

module.exports = {addUser , injectUserDB} 