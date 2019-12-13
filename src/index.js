// import es6 polyfill
import 'core-js/es6/array'
import 'core-js/es6/string'
import 'core-js/es6/promise'

// import es7 polyfill
import 'core-js/es7/array'
import 'core-js/es7/string'
import 'core-js/es7/promise'

// import business
import './less/index.less'
import './utils/axios'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import store from './ducks'
import { routes } from './schema'
import * as components from './components'
import Filters from './utils/filters'
import BtUI from './library'

Vue.use(BtUI)
Vue.use(VueI18n)
Vue.use(VueRouter)

// 工具方法
// AbCdEf => ab-cd-ef
const kebabCase = str => str.replace(/([A-Z])/g, s => '-' + s.toLowerCase()).replace(/^-/, '')

// 自动注册
Object.keys(components).forEach(name => {
  Vue.component(`ex-${kebabCase(name)}`, components[name])
})

// 国际化
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en'
})

// 先写一次
store.dispatch('setLocale', { locale: i18n.locale })

// 组装路由
const router = new VueRouter({
  mode: 'history',
  fallback: true,
  routes: [
    {
      path: '/:lang?',
      component: components.Panel,
      children: routes
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

// 语言拦截
router.beforeEach((to, from, next) => {
  i18n.locale = to.params.lang || 'en'
  if (store.state.locale !== i18n.locale) {
    store.dispatch('setLocale', { locale: i18n.locale })
  }
  next()
})

// 过滤器: 其他通用过滤器
Object.keys(Filters).forEach(name => {
  Vue.filter(name, Filters[name])
})

// 语言前缀
Vue.prototype.$prelang = function (path) {
  return `/${i18n.locale}/${path}`.replace(/\/+/g, '/')
}

// OK LET'S GO
new Vue({ store, router, i18n, render: c => c(components.App) }).$mount('#bootstrap')
