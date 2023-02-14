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
    userType: '2',
  },
  getters: {
    userID: (state) => { return state.userID },
    fName: (state) => { return state.fName },
    userType: (state) => { return state.userType },
  },
  mutations: {
    login(state) {
      var userData = JSON.parse(sessionStorage.getItem("user"))
      state.userID = userData.userID
      state.fName = userData.fName
      if (userData.userID == '0') {
        state.userType = '0'
      } else if (userData.userID != '') {
        state.userType = '1'
      } else {
        state.userType = '2'
      }
      router.push("/")
    },
    logout(state) {
      state.userID = ''
      state.fName = ''
      state.userType = '2'
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
