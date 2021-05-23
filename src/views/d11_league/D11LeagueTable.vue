<template>
  <lazy-league-table
    class="d11-league"
    view="d11-team"
    :seasonStats="d11TeamSeasonStats"
    @visible="getD11TeamSeasonStats"
  />
</template>

<script>
export default {
  name: "D11LeagueTable",
  props: {
    seasonId: Number
  },
  data: () => ({
    d11TeamSeasonStats: null
  }),
  components: {
    LazyLeagueTable: () => import("@/views/league_table/LazyLeagueTable")
  },
  methods: {
    getD11TeamSeasonStats: function() {
      new this.$d11BootApi.D11TeamSeasonStatApi()
        .findD11TeamSeasonStatBySeasonId(this.seasonId)
        .then(result => (this.d11TeamSeasonStats = result));
    }
  },
  watch: {
    seasonId: function() {
      this.d11TeamSeasonStats = null;
      this.getD11TeamSeasonStats();
    }
  }
};
</script>
