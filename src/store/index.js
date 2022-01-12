import Vue from 'vue';
import Vuex from 'vuex';
import state from './states';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import markets from './modules/market'
import assets from './modules/assets'
import swap from './modules/swap'

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    markets,
    assets,
    swap
  }
});
