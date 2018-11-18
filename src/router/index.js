import Vue from 'vue'
import Router from 'vue-router'
import listado from '@/components/listado'
import ingrediente from '@/components/ingrediente'
import recipe from '@/components/weekRecipe'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recipe',
      component: recipe
    },
    {
      path: '/producto',
      name: 'listado',
      component: listado
    },
    {
      path: '/ingrediente',
      name: 'ingrediente',
      component: ingrediente
    }
  ],
  linkActiveClass: 'active',
  mode: 'history'
})
