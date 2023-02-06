import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/shop',
    name:'shop',
    component: () => import('../views/shop.vue')
  },
  {
    path:'/trolley',
    name:'trolley',
    component: ()=> import('../views/trolley.vue')
  },
  {
    path:'/favourite',
    name:'favourite',
    component: ()=> import('../views/favourite.vue')
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
]

const router = new VueRouter({
  routes
})

export default router
