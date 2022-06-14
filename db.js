const { MongoClient } = require('mongodb');
const userController = require('./controllers/userController')
const URI = process.env.URI

async function main() {
    
    const uri = URI
    const client = new MongoClient(uri);

    try {
        
        await client.connect();
        userController.injectDB(client)
        console.log('MongoDB connected succesfully')
       

    } finally {
        
        await client.close();
    }
}

main().catch(console.error);


