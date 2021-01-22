import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import IndexPage from '@/view/index/index'
import HomePage from '@/view/index/home/home'
import LoginPage from '@/view/login/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path:'/index',
      name:'IndexPage',
      component:IndexPage,
      children:[
        {
          path:'/index/home',
          name:'HomePage',
          component:HomePage
        }
      ]
    }
  ]
})
