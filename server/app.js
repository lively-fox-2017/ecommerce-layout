const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')


mongoose.connect("mongodb://dimasgardenia:dima$1990@cluster0-shard-00-00-vtgnv.mongodb.net:27017,cluster0-shard-00-01-vtgnv.mongodb.net:27017,cluster0-shard-00-02-vtgnv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin")

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const ecommerce = require('./routers/ecommerceRoute')

app.use('/api', ecommerce)


app.listen(process.env.Port || 3000, ()=>{
  console.log('i am running at port 3000')
})
