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
    path:'/changeInformation/:productID',
    name:'changeInformation',
    props: true,
    component: ()=> import('../views/changeInformation.vue')
  },
  {
    path:'/AddProduct',
    name:'AddProduct',
    component: ()=> import('../views/AddProduct.vue')
  },
  {
    path:'/salesReport',
    name:'salesReport',
    component: ()=> import('../views/salesReport.vue')
  },
  {
    path:'/ratingAndComment/:POIID/:productID',
    name:'ratingAndComment',
    props: true,
    component: ()=> import('../views/ratingAndComment.vue')
  },
  
]

const router = new VueRouter({
  routes
})

export default router
