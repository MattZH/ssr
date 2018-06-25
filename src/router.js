import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Bar from './components/Bar.vue'
import Foo from './components/Foo.vue'
import Item from './components/Item.vue'

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: Bar },
      { path: '/foo', component: Foo },
      { path: '/item', component: Item }
    ]
  })
}