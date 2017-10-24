new Vue({
  el:'#app',
  data:{
    message:'halo',
    items:[]
  },
  created: function(){
    axios.get('http://localhost:3000/items/get')
    .then(response=>{
      console.log(response);
      this.items=response.data.data
      console.log(this.items);
    })
    .catch(err=>{
      console.log(err);
    })
  }
})
