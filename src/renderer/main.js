import Vue from 'vue'
import axios from 'axios'

import vuexI18n from 'vuex-i18n'
import translationsEn from './lang/en'
import translationsFr from './lang/fr'

import App from './App'
import router from './router'
import store from './store'

// Lang
Vue.use(vuexI18n.plugin, store)
Vue.i18n.add('en', translationsEn)
Vue.i18n.add('fr', translationsFr)
Vue.i18n.set(store.state.local)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
