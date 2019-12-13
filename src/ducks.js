import Vue from 'vue'
import Vuex from 'vuex'
import { modules } from './schema'
import dispatch from './utils/dispatch'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: modules,
  plugins: process.env.NODE_ENV !== 'production' ? [require('vuex/dist/logger')()] : [],
  state: {
    title: 'BITMAIN',
    locale: 'en'
  },
  mutations: {
    setTitle (state, { title }) {
      if (title && state.title !== title) {
        state.title = title
        document.title = title
      }
    },
    setLocale (state, { locale }) {
      state.locale = locale
    }
  },
  actions: {
    setTitle: dispatch('setTitle'),
    setLocale: dispatch('setLocale')
  }
})

export default store
