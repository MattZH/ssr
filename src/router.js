import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(Meta, {
  keyName: 'metaInfo', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-vue-meta', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-vue-meta-server-rendered', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'vmid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
})

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