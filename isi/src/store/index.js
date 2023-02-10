import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({ storage: sessionStorage, })],
  state: {
    userID: '', 
    fName: '',
  },
  getters: {
    userID: (state) => { return state.userID },
    fName: (state) => { return state.fName },
  },
  mutations: {
    login(state) {
      var userData = JSON.parse(sessionStorage.getItem("user"))
      state.userID = userData.userID
      state.fName = userData.fName
      router.push("/shop")
    },
    logout(state) {
      state.userID = ''
      state.fName = ''
      sessionStorage.clear()
      router.push("/login")
    }
  },
  actions: {
    login(context, data) {
      context.commit('login')
    },
    logout(context) {
      context.commit('logout')
    }
  },
  modules: {
  }
})
