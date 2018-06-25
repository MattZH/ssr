import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import api from './api'

export function createStore () {
  return new Vuex.Store({
    state: {
      resumes: []
    },
    actions: {
      fetchResumes ({ commit }) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        return api.get('/resumes').then(res => {
          commit('setResumes', res.data.data.resumes)
        })
      }
    },
    mutations: {
      setResumes (state, resumes) {
        state.resumes = resumes
      }
    }
  })
}