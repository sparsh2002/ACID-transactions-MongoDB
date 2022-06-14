const { MongoClient } = require('mongodb');
const {User}  = require('../models/userModel')
let users
const injectDB = async (conn) =>{
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
        console.log(user)
        res.status(201).json({'message': 'got the data'})
    } catch (e) {
        console.log(e)
    }
}

module.exports = {addUser , injectDB} 