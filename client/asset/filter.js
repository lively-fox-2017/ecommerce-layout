new Vue({
  el: '#app',
  data: {
    cart: [],
    itemCart: [],
    activeProduct: {
      image: '',
      product_name: '',
      price_product:''
    }
  },
  methods: {
    getAll () {
      axios.get('http://localhost:3000/api')
      .then(response => {
        // console.log(response.data)
        this.cart = response.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    getContent (item) {
      // console.log('ini object item', item)
      this.itemCart.push(item)
    },
    getActiveProduct (item) {
      console.log('ini barang modals', item)
      this.activeProduct = item
    }
    },
  mounted: function () {
    this.getAll()
  }
})
