Vue.component('list-item', {
    props: ['list'],
    template: '<div class="card"><div class="blurring dimmable image"><div class="ui dimmer"><div class="content"><div class="center"><div class="ui inverted button" onclick=tada()>Add to cart</div></div></div></div><img v-bind:src="list.img"></div><div class="content"><a class="header">{{ list.name }}</a></div> <div class="extra content"><a><i class="tags icon"></i>Price : {{ list.price }}</a></div></div>'
})
var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Lively Fox!',
      data: [],
      output: ''
    },
    methods : {
      changeMessage: function() {
        this.message = 'Bello'
      },
      load: function() {
          axios.get("http://localhost:3000/products")
          .then(response => {
              this.data = response.data
            console.log(response.data)
            console.log(this.data)
          }) 
          .catch(err => {
              console.log(err)
          })
      },
      add: function() {
          var access = localStorage.getItem('token')
          console.log(access)
      }
    },
    mounted: function () {
        this.load()
    }
  })

//   <div class="card">
//   <div class="blurring dimmable image">
//     <div class="ui dimmer">
//       <div class="content">
//         <div class="center">
//           <div class="ui inverted button" onclick=tada()>Add to cart</div>
//         </div>
//       </div>
//     </div>
//     <img src="/images/elliot.jpg">
//   </div>
//   <div class="content">
//     <a class="header">Item 1</a>
//     <!-- <div class="meta">
//       <span class="date">Create in Sep 2014</span>
//     </div> -->
//   </div>
//   <div class="extra content">
//     <a>
//       <i class="tags icon"></i>
//       Price
//     </a>
//   </div>
// </div>