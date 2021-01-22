import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MsitePage from '@/view/msite'
import IndexPage from '@/view/index/index'
import HomePage from '@/view/index/home/home'
import LoginPage from '@/view/login/login'
import TablePage from '@/view/table/table'
//申明使用插件
Vue.use(Router)

export default new Router({
  routes:[
    {
      path:'/index',
      name:"IndexPage",
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
      path:'/Table',
      name:TablePage,
      component:TablePage,
      meta: {
        showFooter: false
      }
    },
    {
      path: '/',
      component:MsitePage,
    }
  ]
})