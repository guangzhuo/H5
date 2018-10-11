import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/plugin/axios'
import { stat } from 'fs';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 登录用户信息
    user: {},
  },

  mutations: {
    // 设置用户
    SET_USER(state, payload = {}) {
      state.user = payload
    },

  },
  actions: {
    // demo
    async getBankList({ commit }) {
      const data = await axios.get('url')
      commit('SET_USER', data.data)
    },



  }
})

export default store
