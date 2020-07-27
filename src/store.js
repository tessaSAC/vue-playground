import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modalFocusedIsOpen: false,
  },

  getters: {
    modalFocusedIsOpen: state => state.modalFocusedIsOpen,
  },

  mutations: {
    toggleModalFocused: (state) => state.modalFocusedIsOpen = !state.modalFocusedIsOpen,
  },
})
