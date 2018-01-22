import './assets/lib/bootstrap/css/bootstrap.min.css'
import './assets/lib/bootstrap/fonts/glyphicons-halflings-regular.woff'
import Vue from 'vue'
import router from './routers/index'
// import store from './vuex/store'
import App from './App.vue'
import ElementUI from '../node_modules/element-ui'
import './sass/base.scss';
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

