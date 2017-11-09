const cloth = require('../models/cloth')

class Cloth {

  static getDataAdmin(req, res){
    cloth.getClothAdmin(req.headers, (result) => {
      res.send(result)
    })
  }

  static getData(req, res){
    cloth.getCloth(result => {
      res.send(result)
    })
  }

  static getDataById(req, res){
    cloth.getClothToCart(req.params._id, (result) => {
      res.send(result)
    })
  }

  static saveData(req, res){
    cloth.saveCloth(req.body, (result) => {
      res.send(result)
    })
  }

}

module.exports = Cloth
