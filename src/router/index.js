import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../pages/main.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  }
];

const router = new VueRouter({
  routes
});

export default router;
