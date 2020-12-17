import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import NewCategory from '../components/NewCategory.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home, name: 'Home'},
    { path: '/new_category', component: NewCategory, name: 'NewCategory'}
  ]
})

export default router
