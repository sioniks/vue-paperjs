import Vue from "vue";
import VueRouter from "vue-router";
import editorScreen from '../components/editorScreen';

Vue.use(VueRouter);

const routes = [
  { path: "/", component: editorScreen },
];

export default new VueRouter({
  mode: process.env.NODE_ENV === "production" ? "hash" : "history",
  routes
});
