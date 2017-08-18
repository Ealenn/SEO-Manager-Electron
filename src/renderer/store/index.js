import Vue from 'vue'
import Vuex from 'vuex'

import Config from '../config'
import moment from 'moment'

import modules from './modules'

Vue.use(Vuex)

// Local
let StoreLocal = Config.defaultLocal
Config.localAvailable.forEach(function (Local) {
  if (Local.indexOf(Config.local) !== -1) {
    StoreLocal = Local
  }
}, this)

// State
const state = {
  local: StoreLocal
}

// Mutation
const mutations = {
  EDIT_LOCAL (state, local) {
    Vue.i18n.set(local)
    moment.locale(local)
    state.local = local
  }
}

export default new Vuex.Store({
  state,
  mutations,
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
