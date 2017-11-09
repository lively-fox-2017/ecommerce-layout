const mongoose = require('mongoose');
const URI = 'mongodb://localhost/ecommerce_cloth'
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 8
const jwt = require('jsonwebtoken')
const Cloth = require('./cloth')

mongoose.connect(URI, { useMongoClient: true })

var admin = new Schema({
  username: String,
  password: String,
  salt: String
})

var Admin = mongoose.model('Admin', admin)

function signIn(param, cb){
  Admin.findOne({
    username: param.user
  }, (err, user) => {
    if(err) res.status(200).send(err)
    let resPass = bcrypt.compareSync(param.pass, user.salt)
    if(user.username && resPass == true){
      let obj = {
        username: user.username
      }
      let token = jwt.sign(obj, 'secret key')
      cb(token, user.username)
    }else{
      let error = 'Wrong Username Or Password'
      cb(null, error)
    }
  })
}

module.exports = {
  signIn
}
