import Vue from 'vue'
import router from './routers/index'
import App from './App.vue'
import ElementUI from '../node_modules/element-ui'
import './sass/base.scss';
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

