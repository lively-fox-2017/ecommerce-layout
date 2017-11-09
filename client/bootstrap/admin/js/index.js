new Vue({
  el: '#admin',
  data: {
    user: {},
    cloth: []
  },
  methods: {
    getData: function(){
      let lStorage = localStorage.getItem('token')
      if(lStorage){
        this.$http.get('http://localhost:3000/cloth/admin', {
          headers: {
            'token': lStorage
          }
        })
        .then(response => {
          this.user = response.body.username
          response.body.cloth.forEach(r => {
            this.cloth.push(r)
          })
        })
      }else{
        window.location.href = 'login.html'
      }
    },
    logout: function(){
      localStorage.clear()
      setInterval(() => {
        window.location.href = 'index.html'
      }, 1000)
    }
  },
  beforeMount(){
    this.getData()
  }
})
