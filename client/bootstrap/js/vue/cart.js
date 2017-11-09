new Vue({
  el: '#cart',
  data: {
    cart: [],
    cart_items: [],
    qty: 0,
    total_price: 0,
    total_price_item: 0
  },
  methods: {
    getData: function(){
      let cth_id = localStorage.getItem('cloth_id')
      let qty = localStorage.getItem('qty')
      let obj = {
        'cth_id': cth_id,
        'qty': qty
      }
      this.cart.push(obj)
      this.qty = obj.qty
      let splitID = this.cart[0].cth_id.split(',')
      splitID.forEach(r => {
        this.$http.get('http://localhost:3000/cloth/' + r)
        .then(response => {
          const itemIdx = this.cart_items.findIndex(function (item) {
            return item._id === response.body._id
          })

          if(itemIdx === -1) {
            response.body.qty = 1
            response.body.base_price = response.body.price
            this.cart_items.push(response.body)
          } else {
            this.cart_items[itemIdx].qty += 1
          }
          this.cart_items.forEach(s => {
            s.price *= s.qty
          })
        })
      })
    },
    totalPrice: function(){
      // console.log(this.cart_items)
    },
    plusCount: function(id, event){
      event.preventDefault()
      this.cart_items.forEach(r => {
        if(r._id == id){
          r.qty += 1
          let plusPrice = function(){
            return r.base_price * r.qty
          }
          plusPrice()
        }
      })
    },
    minCount: function(id, event){
      event.preventDefault()
      // console.log(this.cart_items[0].price)
      this.cart_items.forEach(r => {
        if(r._id == id){
          r.qty -= 1
          // r.price = (r.price - (r.qty - 1) - 1
        }
      })
    }
  },
  beforeMount(){
    this.getData(),
    this.totalPrice()
  }
})
