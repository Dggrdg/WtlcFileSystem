import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ContractManage from '@/views/contractManage.vue'
import Login from '@/views/login.vue'
import Search from '@/views/search.vue'
import NotFound from '@/views/404.vue'
import SystemEdit from '@/views/systemEdit.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/notfound',
  },
  {
    path: '/contractManage',
    name: 'contractManage',
    component: ContractManage
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/notfound',
    name: 'notfound',
    component: NotFound
  },
  {
    path: '/systemEdit',
    name: 'systemEdit',
    component: SystemEdit
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
