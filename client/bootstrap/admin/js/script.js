new Vue({
  el: '#login',
  data: {
    userLogin: [],
    user: {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function(e){
      e.preventDefault()
      let val = {
        'user': this.user.username,
        'pass': this.user.password
      }
      this.$http.post('http://localhost:3000/admin', val)
      .then(response => {
        if(response.body == 'Wrong Username Or Password'){
          alert(response.body)
        }else{
          alert('Welcome, ' + response.body.auth)
          this.userLogin.push(response.body.auth)
          localStorage.setItem('token', response.body.result)
          setInterval(() => {
            window.location.href = 'index.html'
          }, 500)
        }
      })
    }
  }
})
