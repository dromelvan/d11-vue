import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/Search.vue")
  },
  {
    path: "/match-weeks/:id",
    name: "matchWeek",
    component: () => import("@/views/match_week/MatchWeek.vue")
  },
  {
    path: "/matches/:id",
    name: "match",
    component: () => import("@/views/match/Match.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
