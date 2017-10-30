let vue = new Vue({
  el:'#app',
  data:{
    message:'halo',
    items:[],
    cart: [],
    sum_cart:0,
    notLoggedIn:false,
    historyList:[]
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
    },
    getHistoryOrder: function(){
      let JWTtoken = window.localStorage.getItem('JWTComfortZone')
      let historyList = this.historyList
      axios.post('http://localhost:3000/transactions/find',{JWTtoken})
      .then(response=>{
        console.log(response);
        let responseData = response.data.data
        console.log(responseData);
        for (let i=0; i<responseData.length;i++) {
          let data={
            id:responseData[i]._id,
            tanggal:responseData[i].createdAt,
            total:responseData[i].total,
            //totalRupiah:this.rupiahConverter(history.total)
          }
          historyList.push(data)
        }

      }).catch(err=>{
        console.log(err);
      })
    }
  },
  created: function(){

    this.cart = JSON.parse(window.localStorage.getItem('cart')) || [];
    this.sum_cart = this.cart.length;
    let jwt = window.localStorage.getItem('JWTComfortZone') || '';
    axios.get('http://localhost:3000/users/checklogin/'+jwt)
    .then(response=>{

      if (response.data =='not valid') {
        throw 'already login'
      }

      vue.getHistoryOrder();

    })
    .catch(err=>{
      console.log(err);
      this.notLoggedIn=true;
      vue.getHistoryOrder();
    })
  }
})
