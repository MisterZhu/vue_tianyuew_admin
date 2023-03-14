import { createRouter, createWebHistory } from 'vue-router'
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
        path: "/course",
        name: "course",
        meta:{
          title:'课堂'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/course/CourseIndex.vue'),
        children:[
          {
            path:'/second',
            name:'second',
            component:()=>import('@/views/course/second.vue'),
            meta:{
              title:'second'
            }
          }
        ]
      },
      {
        path: "/course/create",
        name: "course_create",
        meta:{
          title:'创建课程'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/course/CourseAddOrEdit.vue')
      },
      {
        path: "/course/:id/detail",
        name: "course_detail",
        meta:{
          title:'课程详情'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/course/CourseDetail.vue')
      },
      {
        path: "/course/:id/add_article",
        name: "article_add",
        meta:{
          title:'添加章节'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/course/ArticleAdd.vue')
      },
      {
        path: "/about",
        name: "about",
        meta:{
          title:'关羽我们'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/about/AboutUs.vue')
      },
      {
        path: "/system",
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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
