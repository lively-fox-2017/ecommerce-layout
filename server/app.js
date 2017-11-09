const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Routing

const cloth = require('./routes/cloth')
const admin = require('./routes/admin')

app.use('/cloth', cloth)
app.use('/admin', admin)

app.listen(3000, () => {
  console.log('AYO JALAN!')
})
