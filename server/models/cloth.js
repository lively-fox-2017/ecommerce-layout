const mongoose = require('mongoose')
const URI = 'mongodb://localhost/ecommerce_cloth'
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')

mongoose.connect(URI, { useMongoClient: true })

var cloth = new Schema({
  img: String,
  name: String,
  category: String,
  price: Number
})
var Cloth = mongoose.model('Cloth', cloth)

function getClothAdmin(headers, cb){
  let token = headers.token
  let decoded = jwt.verify(token, 'secret key', (err, decoded) => {
    if(decoded.username == decoded.username){
      Cloth.find({}, (err, cloth) => {
        let obj = {
          username: decoded.username,
          cloth: cloth
        }
        cb(obj)
      })
    }else{
      res.status(200).send(err)
    }
  })
}

function getCloth(cb){
  Cloth.find({}, (err, cloth) => {
    if(err) res.status(200).send(err)
    cb(cloth)
  })
}

function getClothToCart(id, cb){
  Cloth.findOne({
    _id: id
  }, (err, cloth) => {
    if(err) res.status(200).send(err)
    cb(cloth)
  })
}

function saveCloth(param, cb){
  var clothSchema = new Cloth({
    img: param.img,
    name: param.name,
    category: param.category,
    price: param.price
  })
  clothSchema.save((err, cloth) => {
    if(err) res.status(200).send(err)
    cb(cloth)
  })
}

module.exports = {
  getClothAdmin,
  getCloth,
  getClothToCart,
  saveCloth
}
