import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ContractManage from '@/views/contractManage/contractManage.vue'
import Login from '../views/login/login.vue'
import Search from '@/views/search/search.vue'
import NotFound from '@/views/404.vue'
import contractParamEdit from '@/views/systemEdit/contractParamEdit.vue'

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
    path: '/contractParamEdit',
    name: 'contractParamEdit',
    component: contractParamEdit
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
