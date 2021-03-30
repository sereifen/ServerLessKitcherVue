import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Recipes from '../views/Recipes.vue'
import Ingredients from '../views/Ingredients.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: Recipes
  },
  {
    path: '/ingredients',
    name: 'Ingredients',
    component: Ingredients
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
