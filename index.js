const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const app = express()
const { MongoClient } = require('mongodb');
const {injectUserDB} = require('./controllers/userController')
dotenv.config()
const URI = process.env.URI
const port = process.env.PORT


const PORT = process.env.PORT
// const db = require('./db.js')
const router = require('./routes/index')
const { injectFruitDB } = require('./controllers/fruitController')
// db.connect()

// middle ware
app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({extended:true, limit:"50mb"}))

// cors
app.use(cors())

app.use((req, res , next) =>{
    req.header("Access-Control-Allow-Origin" , "*")
    req.header("Access-Control-Allow-Headers" , "*")
    next()
})

app.use("/api" , router)

// app.use("/uploads" , express.static(path.join(__dirname,"/../uploads")))
// app.use(express.static(path.join(__dirname,"/../frontend/build")))
// app.get("*" , (req,res) => {
//     try{
//         res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`))
//         // res.sendFile(path.join(`${__dirname}/../frontend/public/index.html`))

//     }
//     catch(e){
//         res.send("Oops! unexpected error")
//     }
// })

MongoClient.connect(
    process.env.URI,
    { 
      useNewUrlParser: true },
  )
    .catch(err => {
      console.error(err.stack)
      process.exit(1)
    })
    .then(async client => {
      await injectUserDB(client)
      await injectFruitDB(client)
      app.listen(port, () => {
        console.log(`listening on port ${port}`)
        console.log('MongoDB connected Successfully')
      })
})