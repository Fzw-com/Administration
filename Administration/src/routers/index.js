import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import '../../node_modules/element-ui/lib/theme-chalk/index.css'
Vue.use(VueRouter);
Vue.use(ElementUI);
// 引入路由文件;

import home from '../components/home/home.vue'
import login from '../components/LoginComponent/login.vue'
import reg from '../components/RegComponent/reg.vue'
var router = new VueRouter({
    routes:[
        {
            path:'/',
            name:'home',
            component:home
        },
        {
            path:'/login',
            name:'login',
            component:login
        },
        {
            path:'/reg',
            name:'reg',
            component:reg
        }
    ]
})
export default router;
