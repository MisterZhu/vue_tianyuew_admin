import { createRouter, createWebHistory } from 'vue-router'
import IndexView from "@/views/home/IndexView.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/home/Home.vue'),
    children: [
      {
        path: "",
        component: IndexView,
      },
      {
        path: "/about",
        name: "about",
        component: () => import(/* webpackChunkName: "about" */ '../views/about/AboutUs.vue')
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginRegister.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
