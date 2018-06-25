<template>
  <div>
    <button @click="sendRequest">发送请求122323</button>
  </div>
</template>

<script>
import api from '../api.js'
export default {
  // mixins: [titleMixin],
  // title () {
  //   return this.item.title
  // },

  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    console.log('[asyncData]','come in');
    return store.dispatch('fetchResumes')
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    resumes () {
      return this.$store.state.resumes
    }
  },
  methods: {
    sendRequest(){
      api.get('/resumes').then(res => {
        console.log(res)
      })
    }
  }
}
</script>