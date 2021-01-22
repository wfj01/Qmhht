import Vue from 'vue'
import Router from 'vue-router'
import MsitePage from '@/view/msite'
import IndexPage from '@/view/index/index'
import HomePage from '@/view/index/home/home'
import LoginPage from '@/view/login/login'
import TablePage from '@/view/caidan/table'
import UploadFile from '@/view/uploadfile/index'
import NoticePage from '@/view/notice/index'
import NoticeDetail from '@/view/notice/detailPage'
import OrderList from '@/view/orderlist/index'
import OrderDetail from '@/view/orderlist/detailPage'
//申明使用插件
Vue.use(Router)

export default new Router({
  routes: [{
      path: '*',
      redirect: '/Login'
    },
    {
      path: '/index',
      name: "IndexPage",
      component: IndexPage,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/home',
      component: HomePage,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/Login',
      name: "Login",
      component: LoginPage,
      meta: {
        showFooter: false
      }
    },
    {
      path: '/TablePage',
      name: "TablePage",
      component: TablePage,
      meta: {
        showFooter: false
      }
    },
    {
      path: "/OrderList",
      name: "OrderList",
      component: OrderList,
      meta: {
        showFooter: false
      }
    },
    {
      path: "/OrderDetail",
      name: "OrderDetail",
      component: OrderDetail,
      meta: {
        showFooter: false
      }
    },
    {
      path: '/NoticePage',
      name: "NoticePage",
      component: NoticePage,
      meta: {
        showFooter: false
      }
    },
    {
      path: '/NoticeDetail',
      name: "NoticeDetail",
      component: NoticeDetail,
      meta: {
        showFooter: false
      }
    },
    {
      path: '/UploadFile',
      name: "UploadFile",
      component: UploadFile,
      meta: {
        showFooter: false
      }
    },
    {
      path: '/MsitePage',
      name: 'MsitePage',
      component: MsitePage,
      meta: {
        showFooter: false
      }
    }
  ]
})
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
