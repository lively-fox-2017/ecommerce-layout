let vue = new Vue({
  el:'#app',
  data:{
    message:'halo',
    items:[],
    cart: [],
    sum_cart:0,
    notLoggedIn:false
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
    addToCart:function (title, img_url, harga, hargaTerbilang, id){
      let cart = JSON.parse(localStorage.getItem('cart')) || []
      cart.push({title, img_url, harga, hargaTerbilang, id});
      localStorage.setItem('cart', JSON.stringify(cart))
      this.cart = cart

      this.sum_cart = this.cart.length
    },
    removeFromCart:function (id){

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
    logout:function(){
      window.localStorage.removeItem('JWTComfortZone');
      window.localStorage.removeItem('cart');
      this.notLoggedIn = false;
    }
  },
  created: function(){
    axios.get('http://localhost:3000/items/get')
    .then(response=>{
      this.items=response.data.data.map((item) => {item.hargaRupiah=this.rupiahConverter(item.harga); return item})
    })
    .catch(err=>{
      console.log(err);
    })

    this.cart = JSON.parse(window.localStorage.getItem('cart')) || [];
    this.sum_cart = this.cart.length;
    let jwt = window.localStorage.getItem('JWTComfortZone') || '';
    console.log(jwt);
    console.log('http://localhost:3000/users/checklogin/'+jwt);
    axios.get('http://localhost:3000/users/checklogin/'+jwt)
    .then(response=>{

      if (response.data =='not valid') {
        throw 'already login'
      }
    })
    .catch(err=>{
      console.log(err);
      this.notLoggedIn=true;
    })
  }
})
