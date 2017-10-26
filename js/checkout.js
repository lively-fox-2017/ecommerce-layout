let vue = new Vue({
  el:'#app',
  data:{
    cart:[],
    notLoggedIn:true
  },
  methods:{
    rupiahConverter:function (angka){
      let strAngka = angka.toString();
      let result = ''
      for( let i =strAngka.length-1; i>=0;i--){
        if ((strAngka.length-i-1) % 3 == 0 && i!= strAngka.length-1) result=".".concat(result)
        result=strAngka[i].concat(result)
      }
      result = "RP ".concat(result)
      return result
    },
    removeFromCart:function (id){
      console.log('asdad');
      for (i in this.cart) {
        if(this.cart[i].id == id){
          this.cart.splice(i,1);
          break
        }
      }
      this.sum_cart = this.cart.length
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    totalPrice:function(){
      let rawTotal = this.cart.reduce((p, c) => {
        return p+c.harga
      }, 0);

      return this.rupiahConverter(rawTotal);
    },
    purchase:function(){
      let data= {
        JWTtoken:window.localStorage.getItem('JWTComfortZone'),
        items:JSON.parse(window.localStorage.getItem('cart')).map((item) => {return item.id}),
        total:this.totalPrice()
      }
      axios.post("http://localhost:3000/transactions/new", data)
      .then(response=>{
        console.log(response.data);
        if(response.data.message=='Berhasil'){
          window.localStorage.removeItem('cart');
          window.location.href='/'
          console.log('lulu');
        }
      })
      .catch(err=>{

      })
    }
  },
  created:function(){
    this.cart = JSON.parse(localStorage.cart)
    if (localStorage.JWTComfortZone) this.notLoggedIn = false
  }
})
