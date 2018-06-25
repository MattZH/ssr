import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { createi18n } from './i18n'
import { sync } from 'vuex-router-sync'

import "./assets/style/main.less";

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp() {

  // 创建 router 实例
  const router = createRouter()

  // 创建 store 实例
  const store = createStore()

  // 创建 i18n 实例
  const i18n = createi18n()

  // 同步路由状态(route state)到 store
  sync(store, router)

  const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  })
  return { app, router, store }
}