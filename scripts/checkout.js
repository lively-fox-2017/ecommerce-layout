Vue.component('cart-item', {
    props: ['cart'],
    template: '<li>{{ cart.name }} {{ cart.price }}</li>'
})

var app = new Vue({
    el: '#app',
    data: {
      data: '',
      cart: [],
      output: ''
    },
    methods : {
      changeMessage: function() {
        this.message = 'Bello'
      },
      load: function() {
        var retrievedObject = localStorage.getItem('token'); 
        console.log(retrievedObject)
        axios.get(`http://35.198.214.127:3000/transactions?token=${retrievedObject}`)
        .then(response => {
            this.cart = response.data.items
            this.data = response.data
            console.log(response)
        }) 
        .catch(err => {
            console.log(err)
        })
      },
      checkout: function() {
        console.log(this.cart)
        var retrievedObject = localStorage.getItem('token');        
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


