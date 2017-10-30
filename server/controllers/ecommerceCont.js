const dbEcom = require('../model/ecommerce')

const getAll = (req, res) => {
  dbEcom.find({}, function (err, result) {
    if (!err) {
      res.send(result)
    } else {
      res.send(err)
    }
  })
}

const createItem = (req, res) => {
  dbEcom.create({
  product_name : req.body.product_name,
  quantity : req.body.quantity,
  price_product: req.body.price_product,
  image: req.body.image
  }, function (err, result) {
  if (!err) {
    res.send(result)
  } else {
    res.send(err)
  }
  })
}


module.exports = {
  getAll,
  createItem
}
