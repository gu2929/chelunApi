import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router'
import store from './store/store'
import './js/flexible'

import {getCookie,login} from './api/index'
//按需加载
// const Index = ()=>import('./view/index.vue')
// const Quesition = ()=>import('./view/question.vue')
import Index from './view/index'
import Quesition from './view/question'

Vue.use(vueRouter)

const Router =new vueRouter({
  routes:[{
    path:'/',
    redirect:'/index'
  },{
    path:'/index',
    component:Index
  },{
    path:'/question',
    component:Quesition
  }]
})
//判断登录态
Router.beforeEach((to,from,next)=>{
  if(getCookie()){
    next()
  }else{
    login()
  }
})
//筛选
Vue.filter('filterCity', function(value){
    if (value){
      return value.replace(/\(签发地\)/gi, '')
    }else{
      return ''
    }
})
new Vue({
  el: '#app',
  router:Router,
  store,
  render: h => h(App)
})
