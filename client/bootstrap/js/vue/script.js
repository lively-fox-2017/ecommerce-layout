new Vue({
  el: '#app',
  data: {
    cloth: [],
    cart_items: [],
    qty: 0
  },
  methods: {
    getData: function(){
      this.$http.get('http://localhost:3000/cloth')
      .then(data => {
        data.body.forEach(r => {
          this.cloth.push(r)
        })
      })
    },
    addToCart: function(cloth_id, price, event){
      event.preventDefault()
      console.log('cloth_id ', cloth_id)
      this.cart_items.push(cloth_id)
      this.qty += 1
      localStorage.setItem('cloth_id', this.cart_items)
      localStorage.setItem('qty', this.qty)
      console.log(localStorage)
    }
  },
  beforeMount(){
    this.getData()
  }
})
