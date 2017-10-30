const product = require('../models/product.js')
const mongoose = require('mongoose')

const addProduct = (req,res) => {
  product.create({
    linkimage:req.body.linkimage,
    namaproduct:req.body.namaproduct,
    deskripsi:req.body.deskripsi,
    harga:req.body.harga
  }).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}

const getProduct = (req,res) => {
  product.find().then((data)=>{
    res.send(data)
  })
}
module.exports = {
  addProduct,
  getProduct
}
