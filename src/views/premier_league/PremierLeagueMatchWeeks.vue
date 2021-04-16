<template>
  <lazy-match-week-list :matchWeeks="matchWeeks" @visible="getMatchWeeks" />
</template>

<script>
export default {
  name: "PremierLeagueMatchWeeks",
  props: {
    premierLeagueId: Number
  },
  data: () => ({
    matchWeeks: null
  }),
  components: {
    LazyMatchWeekList: () => import("@/views/match_week/LazyMatchWeekList")
  },
  methods: {
    getMatchWeeks: function() {
      new this.$d11BootApi.MatchWeekApi()
        .findMatchWeekByPremierLeagueId(this.premierLeagueId)
        .then(result => (this.matchWeeks = result));
    }
  },
  watch: {
    premierLeagueId: function() {
      this.matchWeeks = null;
      this.getMatchWeeks();
    }
  }
};
</script>
