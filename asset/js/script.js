var objTransaksi = []
localStorage.setItem('localTransaksi', objTransaksi)
var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      userLog: {
        username:'',
        role:''
      },
      cart : [],
      product:{
          category:'',
          name:'',
          merek:'',
          type:'',
          spec:'',
          price:'',
          stock:'',
          imgUrl:'',
          createdAt:Date()
      },
      login: {
          username:'',
          password:''
      },
      all_products: [],
      item_product:{},
      category:{
          'category_name':''
      },
      all_category:[]
    },
    mounted: function () {
        this.getAll()
        this.getAllCategory()
        // this.cekToken()
    },
    methods: {
        cekToken(){
            let accessToken = JSON.parse(localStorage.getItem('accessToken')).localToken;
            let localToken = {"token":accessToken}
            axios.post('http://localhost:3000/login/auth', localToken)
            .then(response => {
                if(response) {
                    let objUser = {}
                    objUser["username"] = response.data.username,
                    objUser["role"] = response.data.role
                    localStorage.setItem('accessUser', JSON.stringify(objUser))    
                    return true
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        getLogin() {
            axios.post('http://localhost:3000/login',this.login)
            .then(token => {
                let objToken = {}
                objToken["localToken"] = token.data.localToken
                objToken["fbToken"] = token.data.fbToken
                localStorage.setItem('accessToken', JSON.stringify(objToken))
                let foundToken = JSON.parse(localStorage.getItem('accessToken'))
                this.cekToken()
            })
            .catch(err => {
                console.log(err)
            })
        },
        getAll() {
            axios.get('http://localhost:3000/products')
            .then(rows => {
                this.all_products = rows.data
            })
            .catch(err => {
                console.log('error', err)
            })
        },
        getAllCategory() {
            axios.get('http://localhost:3000/category')
            .then(rows => {
                this.all_category = rows.data
            })
            .catch(err => {
                console.log('error', err)
            })
        },
        addProduct(item) {
            axios.post('http://localhost:3000/products', item)
            .then(response => {
                console.log(response)
                this.all_product = response
            }).catch(err => {
                console.log(err)
            })
        },
        editProduct() {
            console.log('edit nih')
            axios.put('http://localhost:3000/products/'+this.item_product._id, this.item_product)
            .then(response => {
                this.all_product = response
            }).catch(err => {
                console.log(err)
            })
        },
        getByProduct(id) {
            axios.get('http://localhost:3000/products/'+id)
            .then(response => {
                this.item_product = response.data[0]
                console.log(this.item_product)
                // console.log(response.data[0])
            }).catch(err => {
                console.log(err)
            })
        },
        deleteProduct(id) {
            axios.delete('http://localhost:3000/products/'+id)
            .then(response => {
                let newProd = this.all_products.filter(product => {
                    return product._id != id
                })
                this.all_products = newProd
            }).catch(err => {
                console.log(err)
            })
        },
        addCategory(item) {
            axios.post('http://localhost:3000/category', item)
            .then(response => {
                this.category.all_category.push(response.data)
            }).catch(err => {
                console.log(err)
            })
        },
        addCart(order) {
            objCart = {}
            if(this.cart.length != 0) {
                this.cart.forEach(i => {
                    console.log(i)
                    // objCart = {}                    
                    // if(i.ProductId = id) {

                    // }
                })
            } else {
                objCart["ProductId"] = order.id
                objCart["qty"] = order.qty
                objCart["desc"] = order.desc
                this.cart.push(objCart)
                console.log(this.cart)
            }
            
            // this.cart["ProductId"] = id
            // localStorage.setItem("localCart",this.cart)
            // $('#poin-cart').html(this.cart.length)
        },
        showCart(id) {
            axios.get('http://localhost:3000/products/'+id).then(product => {
                objOrder = {}    
                objOrder["id"] = product.data[0]._id
                objOrder["name"] = product.data[0].name
                objOrder["type"] = product.data[0].type
                objOrder["marek"] = product.data[0].merek
                objOrder["spec"] = product.data[0].spec
                objOrder["price"] = product.data[0].price
                objOrder["imgUrl"] = product.data[0].imgUrl 
                $('.modal-body #addCart').modal('toggle').val(objOrder)
            })
        },
        showAccount() {
            if(!this.cekToken) {
                $('#login-form').modal('toggle')                
            } else {
                $('#user-account').modal('toggle')                
            }
        },
        signOut() {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('accessUser')
        }
    }
})
// $(document).ready(function(){
//     let localToken = localStorage.getItem('localTransaksi')
//     $('#account').click(function(){
//         if(localToken) {
//             $('#profile').modal('toggle');
//         } else {
//             $('#login-form').modal('toggle');
//         }
//     })
// })
$(document).on("click", "#detail", function (e) {
    e.preventDefault();
    var _self = $(this);
    var myModalLabel = _self.data('id');
    $("#myModalLabel").html(myModalLabel);
    $(_self.attr('href')).modal('show');
});
