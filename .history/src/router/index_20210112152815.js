import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MsitePage from '@/view/msite'
import IndexPage from '@/view/index/index'
import HomePage from '@/view/index/home/home'
import LoginPage from '@/view/login/login'
//申明使用插件
Vue.use(Router)

export default new Router({
  routes:[
    {
      path:'/index',
      component: IndexPage,
      meta: {
        showFooter: true
      }
    },
    {
      path:'/home',
      component:HomePage,
      meta: {
        showFooter: true
      }
    },
    {
      path:'/Login',
      component:LoginPage,
      meta: {
        showFooter: false
      }
    },
    {
      path: '/',
      components:MsitePage,
      redirect: '/msite' //系统默认页
    }
  ]
})