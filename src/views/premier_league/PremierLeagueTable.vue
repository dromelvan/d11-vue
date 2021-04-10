<template>
  <lazy-table-stat-list
    view="team"
    :tableStats="teamTableStats"
    @visible="getTeamTableStats"
  />
</template>

<script>
export default {
  name: "PremierLeagueTable",
  props: {
    premierLeagueId: Number
  },
  data: () => ({
    teamTableStats: null
  }),
  components: {
    LazyTableStatList: () => import("@/views/table_stat/LazyTableStatList")
  },
  methods: {
    getTeamTableStats: function() {
      new this.$d11BootApi.TeamTableStatApi()
        .findTeamTableStatByPremierLeagueId(this.premierLeagueId)
        .then(result => (this.teamTableStats = result));
    }
  },
  watch: {
    premierLeagueId: function() {
      this.teamTableStats = null;
      this.getTeamTableStats();
    }
  }
};
</script>
