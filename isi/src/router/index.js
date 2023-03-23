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
    path:'/product/:productID',   //product detail page
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
    path:'/vlogin',   //login for vendor
    name:'vlogin',
    component: ()=> import('../views/vlogin.vue')
  },
  {
    path:'/purchaseOrder',    //purchase order for vendor
    name:'purchaseOrder',
    component: ()=> import('../views/purchaseOrder.vue')
  },
  {
    path:'/purchaseOrder/:POID',
    name:'purchaseOrderDetail',
    props: true,
    component: ()=> import('../views/purchaseOrderDetail.vue')
  },
  {
    path:'/purchaseTracking',   //purchase order for customer
    name:'purchaseTracking',
    component: ()=> import('../views/purchaseTracking.vue')
  },
  {
    path:'/purchaseTrackingDetail/:POID',
    name:'purchaseTrackingDetail',
    props: true,
    component: ()=> import('../views/purchaseTrackingDetail.vue')
  },
  {
    path:'/changePassword',
    name:'changePassword',
    component: ()=> import('../views/changePassword.vue')
  },
  {
    path:'/test',
    name:'test',
    component: ()=> import('../views/test.vue')
  },
  {
    path:'/changeInformation/:ProductID',
    name:'changeInformation',
    component: ()=> import('../views/changeInformation.vue')
  },
  
]

const router = new VueRouter({
  routes
})

export default router
