const mongoose = require('mongoose')
const Schema = mongoose.Schema

let EcommerceSchema = new Schema({
  product_name : String,
  quantity : Number,
  price_product: Number,
  image: String
})

var Ecommerce = mongoose.model('Ecommerce', EcommerceSchema)

module.exports = Ecommerce
