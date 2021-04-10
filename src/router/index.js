import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/Search.vue")
  },
  {
    path: "/seasons/:id",
    name: "season",
    component: () => import("@/views/season/Season.vue")
  },
  {
    path: "/premier-leagues/:id",
    name: "premierLeague",
    component: () => import("@/views/premier_league/PremierLeague.vue")
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
