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
        this.cart = response.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    getContent (item) {
      this.itemCart.push(item)
    },
    getActiveProduct (item) {
      this.activeProduct = item
    }
    },
  mounted: function () {
    this.getAll()
  },
  computed: {
    finalPrice() {
      return this.itemCart.reduce(function (prevValue, itemPrice){
        return prevValue + itemPrice.price_product
      }, 0)
    }
  }
})
