import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    submenu: false,
    
  },
  mutations: {
    
    // formSubmit(state, payload) {
    //   state.formSubmit.open = payload.open,
    //   state.formSubmit.result = payload.result
    // }
  }
});
