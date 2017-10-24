var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Lively Fox!',
      data: [],
      output: ''
    },
    methods : {
      getFormValues: function getFormValues () {
        axios.post("http://localhost:3000/customers/login", {
            name: this.$refs.name.value,
            password: this.$refs.password.value})
        .then(response => {
            console.log(response.data)
        }) 
        .catch(err => {
            console.log(err)
        })
        //   console.log(this.$refs.name.value)
        // this.output = this.$refs.name.value
      }
    },
    mounted: function () {
    }
  })