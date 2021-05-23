<template>
  <lazy-league-table
    class="premier-league"
    view="team"
    :seasonStats="teamSeasonStats"
    @visible="getTeamSeasonStats"
  />
</template>

<script>
export default {
  name: "PremierLeagueTable",
  props: {
    seasonId: Number
  },
  data: () => ({
    teamSeasonStats: null
  }),
  components: {
    LazyLeagueTable: () => import("@/views/league_table/LazyLeagueTable")
  },
  methods: {
    getTeamSeasonStats: function() {
      new this.$d11BootApi.TeamSeasonStatApi()
        .findTeamSeasonStatBySeasonId(this.seasonId)
        .then(result => (this.teamSeasonStats = result));
    }
  },
  watch: {
    seasonId: function() {
      this.teamSeasonStats = null;
      this.getTeamSeasonStats();
    }
  }
};
</script>
