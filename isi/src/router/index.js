import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'shop',
    component: () => import('../views/shop.vue')
  },
  {
    path:'/product/:productID',
    name:'product',
    props: true,
    component: () => import('../views/product.vue')
  },
  {
    path:'/trolley',
    name:'trolley',
    component: ()=> import('../views/trolley.vue')
  },
  {
    path:'/personal',
    name:'personal',
    component: ()=> import('../views/personal.vue')
  },
  {
    path:'/register',
    name:'register',
    component: ()=> import('../views/register.vue')
  },
  {
    path:'/login',
    name:'login',
    component: ()=> import('../views/login.vue')
  },
  {
    path:'/vlogin',
    name:'vlogin',
    component: ()=> import('../views/vlogin.vue')
  },
  {
    path:'/purchaseOrder',
    name:'purchaseOrder',
    component: ()=> import('../views/purchaseOrder.vue')
  },
  {
    path:'/purchaseOrder/:POIID',
    name:'purchaseOrderDetail',
    props: true,
    component: ()=> import('../views/purchaseOrderDetail.vue')
  },
  {
    path:'/purchaseTracking',
    name:'purchaseTracking',
    component: ()=> import('../views/purchaseTracking.vue')
  },
  {
    path:'/purchaseTracking/:POIID',
    name:'purchaseTrackingDetail',
    props: true,
    component: ()=> import('../views/purchaseTrackingDetail.vue')
  },
  {
    path:'/changePassword',
    name:'changePassword',
    component: ()=> import('../views/changePassword.vue')
  },
  
]

const router = new VueRouter({
  routes
})

export default router
