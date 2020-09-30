import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Welcome = () => import('views/home/childComps/Welcome')
const User = () => import('views/home/childComps/user/User')
const Rights = () => import('views/home/childComps/power/Rights')
const Roles = () => import('views/home/childComps/power/Roles')
const Cate = () => import('views/home/childComps/goods/Cate')
const Params = () => import('views/home/childComps/goods/Params')
const List = () => import('views/home/childComps/goods/List')
const Add = () => import('views/home/childComps/goods/Add')
const Order = () => import('views/home/childComps/order/Order')
const Login = () => import('views/login/Login')


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/Welcome',
    children: [
      {
        path: '/Welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: User
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/categories',
        component: Cate
      },
      {
        path: '/params',
        component: Params
      },
      {
        path: '/goods',
        component: List
      },
      {
        path: '/goods/add',
        component: Add
      },
      {
        path: '/orders',
        component: Order
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from代表从哪个路径跳转而来
  // next是一个函数,表示放行
  // next() 放行  next('./login') 强制跳转
  if(to.path === '/login'){
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) {
    return next('/login')
  }
  next()
})

export default router
