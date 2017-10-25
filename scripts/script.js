Vue.component('list-item', {
    props: ['list'],
    template: '<div class="card"><div class="blurring dimmable image"><div class="ui dimmer"><div class="content"><div class="center"><div class="ui inverted button" v-on:click="add(list)" onclick="tada()">Add to cart</div></div></div></div><img v-bind:src="list.img"></div><div class="content"><a class="header">{{ list.name }}</a></div> <div class="extra content"><a><i class="tags icon"></i>Price : {{ list.price }}</a></div><div class="extra content"><a v-on:click="add(list)" onclick="tada()"><i class="add to cart icon icon"></i></a></div></div>',
    methods: {
        add(list) {
            this.$emit('added', list)
        }
    }
})
Vue.component('cart-item', {
    props: ['cart'],
    template: '<a class="item">{{ cart.name }}</a>'
})

var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Lively Fox!',
      products: [],
      cart: [],
      output: ''
    },
    methods : {
      changeMessage: function() {
        this.message = 'Bello'
      },
      load: function() {
          axios.get("http://localhost:3000/products")
          .then(response => {
              this.products = response.data
            console.log(response.data)
          }) 
          .catch(err => {
              console.log(err)
          })
      },
      add: function(item) {
        //   var access = localStorage.getItem('token')
        //   console.log(access)
        // console.log(this.products[this.products.indexOf(item)])
        var retrievedObject = localStorage.getItem('token');
        console.log(retrievedObject)
        this.cart.push(this.products[this.products.indexOf(item)])
        // this.cart.push()
      },
      checkout: function() {
        console.log(this.cart)
        var retrievedObject = localStorage.getItem('token');        
        var data = {
            token: retrievedObject,
            cart: this.cart 
        }
        axios.post("http://localhost:3000/transactions", data)
        .then(response => {
            console.log(response)
        }) 
        .catch(err => {
            console.log(err)
        })
      },
      hasLogin: function() {
        var retrievedObject = localStorage.getItem('token');
        console.log(retrievedObject)
        if(typeof retrievedObject !== 'string') {
            console.log('keluar lu')            
            window.location.href = "login.html"
        }
      }
    },
    mounted: function () {
        // localStorage.setItem('token', 'hai')
        // localStorage.removeItem('token')
        this.hasLogin()
        this.load()
    }
  })


