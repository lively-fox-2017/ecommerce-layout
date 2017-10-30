const mongoose = require('mongoose')
const Schema = mongoose.Schema

let PriceSchema = new Schema({
  final_price: Number
})

var FinalPrice = mongoose.model('FinalPrice', PriceSchema)

module.exports = FinalPrice
