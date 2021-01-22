import Vue from 'vue'
import Router from 'vue-router'
import MsitePage from '@/view/msite'
import IndexPage from '@/view/index/index'
import HomePage from '@/view/index/home/home'
import LoginPage from '@/view/login/login'
import TablePage from '@/view/caidan/table'
import UploadFile from  '@/view/uploadfile/index'
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
      path:'/TablePage',
      name:"TablePage",
      component:TablePage,
      meta: {
        showFooter: false
      }
    },
    {
      path:'/UploadFile',
      name:"UploadFile",
      component:UploadFile,
      meta: {
        showFooter: false
      }
    },
    {
      path: '/MsitePage',
      component:MsitePage,
    }
  ]
})
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}