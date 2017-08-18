const state = {
  text: 'Chargement',
  show: false
}

const mutations = {
  UPDATE_LOADING (state, Loading) {
    state.text = Loading.text || ''
    state.show = Loading.show || false
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
