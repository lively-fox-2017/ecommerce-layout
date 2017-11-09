const admin = require('../models/admin')

class Admin {

  static signIn(req, res){
    admin.signIn(req.body, (result, auth) => {
      if(result){
        let obj = {
          result: result,
          auth: auth
        }
        res.send(obj)
      }else{
        res.send(auth)
      }
    })
  }

}

module.exports = Admin
