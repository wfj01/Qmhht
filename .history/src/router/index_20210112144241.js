import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import IndexPage from '@/view/index/index'
import HomePage from '@/view/index/home/home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
