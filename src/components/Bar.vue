<template>
  <div>
    {{msg}}
    {{ $t('test') }}
    <div class="title">123</div>
    <button @click="changeLocale">切换语言</button>
  </div>
</template>

<script>

export default {
  metaInfo: {
      title: "首页",
      meta: [{ name: 'description', content: '人工智能工程院' }],
  },
  data() {
    return {
      msg: 'hello world112'
    }
  },
  methods: {
    changeLocale(){
      if(this.$i18n.locale === 'zh-CN'){
        this.$i18n.locale = 'en-US'
      }else{
        this.$i18n.locale = 'zh-CN'
      }
    }
  },
  computed: {
    locale(){
      return this.$i18n.locale
    }
  },
  watch: {
    locale(val){
        document.title = this.$t('title.home')
    }
  },
}
</script>

<style lang="less" scoped>
</style>