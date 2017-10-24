
document.querySelector('#btn-login').addEventListener('click', ()=>{
  let email = document.querySelector('#login-email');
  let password = document.querySelector('#login-password');
  //console.log(email.value , password.value);
  axios.post('http://localhost:3000/users/login', {
    email:email.value,
    password:password.value
  })
  .then(result=>{
    console.log(result);

    if(result.data.message=='Berhasil'){
      console.log('asldkjaslk');
      window.localStorage.setItem('JWTComfortZone', result.data.data.jwt);
      window.location.href = 'http://localhost:8080/'
    }
  })
})
