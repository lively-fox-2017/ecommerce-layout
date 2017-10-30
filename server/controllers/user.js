const user = require('../models/user.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
require('dotenv').config()

const addUser = (req,res) => {
  var hash = bcrypt.hashSync(req.body.password, salt);
  user.create({
    username:req.body.username,
    password:hash,
    email:req.body.email,
    role:req.body.role
  }).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}

const loginUser = (req,res) => {
  user.findOne({username:req.body.username
  })
  .then(data =>{
    if (bcrypt.compareSync(req.body.password, data.password)) {
      var token = jwt.sign({
        username: data.username,
        email: data.email
      }, process.env.DB_HOST);
      res.send(token)
    }else{
      res.send('Ga ada Data')
    }
  })
}

const getUser = (req,res) => {
  user.find().then((data)=>{
    res.send(data)
  })
}
module.exports = {
  addUser,
  loginUser,
  getUser
}
