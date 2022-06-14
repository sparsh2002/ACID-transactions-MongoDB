const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
let users
let fruits
let client

const injectTransactionDB = async (conn) =>{
    client = conn
    if(users && fruits){
        return 
    }
    try {
        users = await conn.db('acid').collection("users")
        fruits = await conn.db('acid').collection("fruits")
    } catch (e) {
        console.error(`Unable to establish collection handle: ${e}`)
    }
}

const addFruitToBasket = async(req , res ) =>{
    const fruit = req.body.fruit
    let userId = req.body.userId
    userId = ObjectId(userId)
    // console.log(userId)
    const session = client.startSession();

    
    const transactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' }
    };

    try {
        const transactionResults = await session.withTransaction(async ()=>{
            const foundFruitInBasket = await users.findOne({_id:userId , basket:fruit}, {session})
            if(foundFruitInBasket){
                await session.abortTransaction();
                console.log('The fruit is already present in user basked')
                console.log("Any operations that already occurred as part of this transaction will be rolled back.")
                return
            }
 
        } , transactionOptions)

        const doc = await users.updateOne({_id:userId }, {$push:{basket:fruit}})
        console.log(doc)
        if (transactionResults) {
            console.log("The transaction was successfull");
        } else {
            console.log("The transaction was intentionally aborted.");
        }
    } catch (e) {
        console.log('Transaction Aborted')
    }
    finally {
        
        await session.endSession();
    }
    
    res.status(201).json({message:"success"})
}

module.exports = {injectTransactionDB , addFruitToBasket}