import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import LoginPage from "@/pages/LoginPage.vue";
import CategoriesPage from "@/pages/CategoriesPage.vue";
import PrioritiesPage from "@/pages/PrioritiesPage.vue";
import TasksPage from "@/pages/TasksPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";


const routes: Array<RouteRecordRaw> = [

  {
    path: '/',
    component: LoginPage
  },
  {
    path: '/categories',
    component: CategoriesPage
  },
  {
    path: '/priorities',
    component: PrioritiesPage
  },
  {
    path: '/tasks',
    component: TasksPage
  },
  {
    path: '/register',
    component: RegisterPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
