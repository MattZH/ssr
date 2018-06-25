import Vue from 'vue'
import i18n from 'vue-i18n'

Vue.use(i18n)

export function createi18n() {
  return new i18n({
    locale: 'zh-CN', // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
      'zh-CN': require('./locale/zh-CN.json'), // 中文语言包
      'en-US': require('./locale/en-US.json') // 英文语言包
    }
  })
}