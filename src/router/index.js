import { createRouter, createWebHistory } from 'vue-router'
import Home from '../view/Home.vue'
import AboutView from '../view/AboutView.vue'
import ProductView from '../view/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
  ]
})

export default router