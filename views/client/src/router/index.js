import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Product from '@/components/product'
import About from '@/components/about'

Vue.use(Router)

export default new Router({
	mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/product/:productId',
      name: 'Product',
      component: Product
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
  ]
})
