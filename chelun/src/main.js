import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router'
import store from './store/store'
import './js/flexible'
import Index from './view/index.vue'
Vue.use(vueRouter)
const Router =new vueRouter({
  routes:[{
    path:'/',
    redirect:'/index'
  },{
    path:'/index',
    component:Index,
  }]
})
new Vue({
  el: '#app',
  router:Router,
  store,
  render: h => h(App)
})
