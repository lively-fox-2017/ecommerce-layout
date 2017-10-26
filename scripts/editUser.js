Vue.component('list-item', {
    props: ['list'],
    template: '<li> {{list.name}} <button v-on:click="hapus(list)">Delete</button></li>',
    methods: {
        hapus (list) {
            this.$emit('deleted', list)
            window.location.href = "editUser.html"
        }
    }
})
var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Lively Fox!',
      customers: [],
      output: ''
    },
    methods : {
      getFormValues: function getFormValues () {
        axios.put("http://server.fox-son.tk:3000/customers", {
            oldName: this.$refs.old_name.value,
            oldPassword: this.$refs.old_password.value,
            name: this.$refs.name.value,
            password: this.$refs.password.value,
            email: this.$refs.email.value
        })
        .then(response => {
            console.log(response)
        }) 
        .catch(err => {
            console.log(err)
        })
      },
      hapus: function(item) {
        console.log('hayo ', item)
        axios.delete(`http://server.fox-son.tk:3000/customers/${item._id}`)
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
      }
    },
    mounted: function () {
        axios.get("http://server.fox-son.tk:3000/customers")
        .then(response => {
            this.customers = response.data
        })
        .catch(err => {
            console.log(err)
        })
    }
  })