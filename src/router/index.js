import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/:tab?",
    name: "home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/rules",
    name: "rules",
    component: () => import("@/views/Rules.vue")
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
    name: "d11Match",
    component: () => import("@/views/d11_match/D11Match.vue")
  },
  {
    path: "/teams/:id/:seasonId/:tab?",
    name: "team",
    component: () => import("@/views/team/Team.vue")
  },
  {
    path: "/d11-teams/:id/:seasonId/:tab?",
    name: "d11Team",
    component: () => import("@/views/d11_team/D11Team.vue")
  },
  {
    path: "/d11-teams/:seasonId",
    name: "d11Teams",
    component: () => import("@/views/d11_team/D11Teams.vue")
  },
  {
    path: "/players/:id/:seasonId/:tab?",
    name: "player",
    component: () => import("@/views/player/Player.vue"),
    props: true
  },
  {
    path: "/player-season-stats/:seasonId/:tab?",
    name: "playerSeasonStats",
    component: () => import("@/views/player_season_stat/PlayerSeasonStats.vue")
  },
  {
    path: "/available-players/:seasonId",
    name: "availablePlayers",
    component: () => import("@/views/player_season_stat/AvailablePlayers.vue")
  },
  {
    path: "/transfer-windows/:id/:tab?",
    name: "transferWindow",
    component: () => import("@/views/transfer_window/TransferWindow.vue")
  },
  {
    path: "/transfer-days/:id/:tab?",
    name: "transferDay",
    component: () => import("@/views/transfer_day/TransferDay.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
