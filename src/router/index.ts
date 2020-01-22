import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'participants',
    component: () => import('@/views/Participants.vue'),
  },
  {
    path: '/picker',
    name: 'picker',
    component: () => import('@/views/Picker.vue'),
  },
  {
    path: '/winners',
    name: 'winners',
    component: () => import('@/views/Winners.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
