const { MongoClient } = require('mongodb');

const URI = process.env.URI

async function main() {
    
    const uri = URI
    const client = new MongoClient(uri);

    try {
        
        await client.connect();
        console.log('MongoDB connected succesfully')
       

    } finally {
        
        await client.close();
    }
}

main().catch(console.error);

