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
        axios.get(`http://server.fox-son.tk:3000/transactions?token=${retrievedObject}`)
        .then(response => {
            if(response.data === '') {
                console.log('kosong gan')
                alert('You have no ongoing transactions')                
                window.location.href = "index.html"
            }
            this.cart = response.data.items
            this.data = response.data
            console.log(response)
        }) 
        .catch(err => {
            console.log(err)
        })
      },
      checkout: function() {
        console.log(this.data._id)
        var id = this.data._id
        this.hasLogin()
        axios.delete(`http://server.fox-son.tk:3000/transactions?id=${id}`)
        .then(response => {
            console.log(response)
            window.location.href = "index.html"
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


