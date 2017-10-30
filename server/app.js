const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')


mongoose.connect('mongodb://localhost/ecommerce')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const ecommerce = require('./routers/ecommerceRoute')

app.use('/api', ecommerce)


app.listen(process.env.Port || 3000, ()=>{
  console.log('i am running at port 3000')
})
