new Vue({
  el:'#app',
  data:{
    message:'halo',
    items:[]
  },
  methods:{
    rupiahConverter:(angka)=>{
      let strAngka = angka.toString();
      let result = ''
      for( let i =strAngka.length-1; i>=0;i--){
        if ((strAngka.length-i-1) % 3 == 0 && i!= strAngka.length-1) result=".".concat(result)
        result=strAngka[i].concat(result)
      }
      result = "RP ".concat(result)
      return result
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
  }
})
