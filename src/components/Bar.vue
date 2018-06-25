<template>
  <div>
    {{msg}}
    {{ $t('test') }}
    <button @click="changeLocale">切换语言</button>
  </div>
</template>

<script>
export default {
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
}
</script>

<style lang="less" scoped>
</style>