import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const state = () => ({
  categories: [],
  settings: {},
  loading: false,
  error: {},
  errors: [],
  isError: null // Only required to inform App.vue that an error is there hence initiate the snackbar
})
export const getters = {
  loading(state) {
    return state.loading
  }
}
export const mutations = {
  categories(state, payload) {
    state.categories = payload
  },
  settings(state, payload) {
    state.settings = payload
  },
  busy(state, payload) {
    state.loading = payload
  },
  success(state, msg) {
    this.$toast.success(msg).goAway(2000)
  },
  warning(state, msg) {
    this.$toast.warning(msg).goAway(5000)
  },
  info(state, msg) {
    this.$toast.info(msg).goAway(5000)
  },
  clearErr(state) {
    state.errors = []
  },
  setGuest(state, guestId) {
    state.guestId = guestId
  },
  setErr(state, e) {
    state.loading = false
    if (e.graphQLErrors) state.errors = e.graphQLErrors
    if (e.networkError)
      state.errors = e.networkError.result && e.networkError.result.errors
    else
      state.errors = [{ message: e }]
    console.log('err at store...', e.toString())
  }
}
export const actions = {
  async fetch({ commit, state, getters }) {
    try {
      commit('clearErr')
      const settings = (
        await this.app.apolloProvider.defaultClient.query({
          query: settingQ
        })
      ).data.settings
      await commit('settings', settings)
    } catch (e) {
    } finally {
      commit('busy', false)
    }
  },
  async nuxtClientInit({ state, commit, dispatch }, context) {
    await dispatch('fetch')
    await dispatch('auth/fetch')
  }
}
