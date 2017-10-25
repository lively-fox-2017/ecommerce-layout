let login = new Vue(
  {
    el:'#app',
    data:{
      notLoggedIn:false,
      email:'',
      password:'',
      error:false,
      wait_log:false
    },
    methods:{
      login:function(){
        this.error=false
        this.wait_log=true
        let email = this.email;
        let password = this.password;
        axios.post('http://localhost:3000/users/login',{
          email,
          password
        })
        .then(response=>{
          if(response.data.message=='Berhasil'){
            //console.log(response.data);
            window.localStorage.setItem('JWTComfortZone', response.data.data.jwt);
            window.location.href = '/';
          }else{
            throw '!Something WRONG'
          }
          this.wait_log=false;
        })
        .catch(err=>{
          console.log(err);
          this.error=true;
          this.wait_log=false;
        })
      }
    },
    beforeCreate: function(){
      let jwt = window.localStorage.getItem('JWTComfortZone');

      axios.get('http://localhost:3000/users/checklogin/'+jwt)
      .then(response=>{

        if (response.data =='valid') {
          window.location.href = 'http://localhost:8080/'
        }else{
          this.notLoggedIn=true;
        }
      })
      .catch(err=>{
        this.notLoggedIn=true;
      })
    }
  }
)
