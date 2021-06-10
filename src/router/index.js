import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cadastrar from '../views/Cadastrar.vue'

Vue.use(VueRouter)




const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cadastrar',
    name: 'cadastrar',
    component: Cadastrar
  }
 
]

const router = new VueRouter({
  routes
})

export default router

