import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import IndexView from "@/views/home/IndexView.vue";

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginRegister.vue')
  },
  {
    path: '/',
    name: 'home',
    meta:{
      title:'首页',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/home/Home.vue'),
    children: [
      {
        path: "",
        meta:{
          title:'首页'
        },
        component: IndexView,
      },
      
      {
        path: "course",
        name: "course",
        meta:{
          title:'课堂'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/course/CourseIndex.vue'),
      },
      {
        path: "course/create",
        name: "course_create",
        meta:{
          title:'创建课程'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/course/CourseAddOrEdit.vue')
      },
      {
        path: "course/:id/detail",
        name: "course_detail",
        meta:{
          title:'课程详情'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/course/CourseDetail.vue')
      },
      {
        path: "course/:id/add_article",
        name: "article_add",
        meta:{
          title:'添加章节'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/course/ArticleAdd.vue')
      },
      {
        path: "about",
        name: "about",
        meta:{
          title:'关羽我们'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/about/AboutUs.vue')
      },
      {
        path: "tyw_admin",
        name: "tyw_admin",
        meta:{
          title:'认证申请'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/tyw_admin/TywAuthApply.vue')
      },
      {
        path: "tyw_users",
        name: "tyw_users",
        meta:{
          title:'用户列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/tyw_users/TywUsers.vue')
      },
      {
        path: "tyw_community",
        name: "tyw_community",
        meta:{
          title:'社区管理'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/tyw_community/TywCommunity.vue')
      },
      {
        path: "tyw_feedback",
        name: "tyw_feedback",
        meta:{
          title:'用户反馈'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/tyw_feedback/TywFeedback.vue')
      },
      {
        path: "system",
        name: "system",
        meta:{
          title:'系统管理'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/system/SystemIndex.vue')
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  },
  {
    path: '/header',
    name: 'header',
    component: () => import(/* webpackChunkName: "about" */ '../views/home/HomeHeader.vue')
  },
  {
    path: '/appweb',
    name: 'appweb',
    component: () => import(/* webpackChunkName: "about" */ '../views/appweb/AppWeb.vue'),
    children: [

    ]
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  if (to.matched.some(r=>r.meta?.requiresAuth)){
    // 移除localStorage中的"token"
    const tokenValue = localStorage.getItem('local_token');
    if (!tokenValue) {
      next({name:'login', query: {redirect: to.fullPath}})
      return
    }
  }
  next()
})
export default router
