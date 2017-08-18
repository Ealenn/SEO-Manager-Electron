const state = {
  url: '',
  $: null
}

const mutations = {
  UPDATE_WEBSITE (state, url) {
    state.url = url
  },
  UPDATE_QUERY (state, $) {
    state.$ = $
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
