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
    path: "/seasons",
    name: "seasons",
    component: () => import("@/views/season/Seasons.vue")
  },
  {
    path: "/seasons/:id/:tab?",
    name: "season",
    component: () => import("@/views/season/Season.vue")
  },
  {
    path: "/premier-leagues/:id/:tab?",
    name: "premierLeague",
    component: () => import("@/views/premier_league/PremierLeague.vue")
  },
  {
    path: "/match-weeks/:id/:tab?",
    name: "matchWeek",
    component: () => import("@/views/match_week/MatchWeek.vue")
  },
  {
    path: "/matches/:id",
    name: "match",
    component: () => import("@/views/match/Match.vue")
  },
  {
    path: "/d11-matches/:id",
    name: "d11-match",
    component: () => import("@/views/d11_match/D11Match.vue")
  },
  {
    path: "/d11-leagues/:id",
    name: "d11League",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/teams/:id/:seasonId/:tab?",
    name: "team",
    component: () => import("@/views/team/Team.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
