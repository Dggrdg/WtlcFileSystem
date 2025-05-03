import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import searchContract from '@/views/searchContract.vue';
import systemEdit from '@/views/systemEdit.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/searchContract',
    name: 'searchContract',
    component: searchContract
  },
  {
    path: '/systemEdit',
    name: 'systemEdit',
    component: systemEdit
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
