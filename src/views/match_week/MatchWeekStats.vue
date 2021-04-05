<template>
  <div style="min-height: 680px">
    <v-container class="h1-container">
      <h1>
        Player Statistics
      </h1>
    </v-container>

    <lazy-player-stat-list
      context="Top 5 Players"
      view="match"
      :playerStats="top5PlayerStats"
      @visible="findTop5PlayerMatchStatByMatchWeek"
    />

    <lazy-player-stat-list
      context="Bottom 5 Players"
      view="match"
      :playerStats="bottom5PlayerStats"
      @visible="findBottom5PlayerMatchStatByMatchWeek"
    />
  </div>
</template>

<script>
export default {
  name: "MatchWeekStats",
  props: {
    matchWeekId: Number
  },
  data: () => ({
    top5PlayerStats: null,
    bottom5PlayerStats: null
  }),
  components: {
    LazyPlayerStatList: () => import("@/views/player_stat/LazyPlayerStatList")
  },
  methods: {
    findTop5PlayerMatchStatByMatchWeek() {
      new this.$d11BootApi.PlayerMatchStatApi()
        .findTop5PlayerMatchStatByMatchWeek(this.matchWeekId)
        .then(result => (this.top5PlayerStats = result));
    },
    findBottom5PlayerMatchStatByMatchWeek() {
      new this.$d11BootApi.PlayerMatchStatApi()
        .findBottom5PlayerMatchStatByMatchWeek(this.matchWeekId)
        .then(result => (this.bottom5PlayerStats = result));
    }
  },
  watch: {
    matchWeekId: function() {
      this.top5PlayerStats = null;
      this.bottom5PlayerStats = null;
      this.findTop5PlayerMatchStatByMatchWeek();
      this.findBottom5PlayerMatchStatByMatchWeek();
    }
  }
};
</script>
