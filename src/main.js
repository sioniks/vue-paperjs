import Vue from "vue";
import store from "./store";
import router from "./routes";
import App from "./App.vue";
import "@/scss/app.scss";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
