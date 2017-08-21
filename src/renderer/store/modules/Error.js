const state = {
  title: '',
  text: '',
  show: false
}

const mutations = {
  UPDATE_ERROR (state, Error) {
    state.title = Error.title || ''
    state.text = Error.text || ''
    state.show = Error.show || false
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
