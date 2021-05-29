<template>
  <div class="match-day" v-if="matchWeek">
    <match-week-overview-sm-and-up v-if="smAndUp" :matchWeek="matchWeek" />

    <content-section>
      <v-container class="tabs-container">
        <v-tabs>
          <v-tab class="matches-tab">
            Premier League Matches
          </v-tab>
          <v-tab class="matches-tab">
            D11 Matches
          </v-tab>
          <v-tab class="stats-tab">
            Statistics
          </v-tab>

          <v-tab-item>
            <lazy-match-list
              v-for="date in Object.keys(matchWeek.matches)"
              :key="date"
              :date="date"
              :matchIds="matchWeek.matches[date]"
            />
          </v-tab-item>
          <v-tab-item>
            <lazy-d11-match-list
              v-for="date in Object.keys(matchWeek.d11Matches)"
              :key="date"
              :date="date"
              :d11MatchIds="matchWeek.d11Matches[date]"
            />
          </v-tab-item>
          <v-tab-item>
            <!-- This hack with v-for resets the stats tab so it doesn't load stats on route change when it's not
                 the active tab. Some day we might want to figure out how to do it in a less hacky way. -->
            <match-week-stats
              :matchWeekId="matchWeek.id"
              v-for="matchWeek in [this.matchWeek]"
              :key="matchWeek.id"
            />
          </v-tab-item>
        </v-tabs>
      </v-container>
    </content-section>
  </div>
</template>

<script>
export default {
  name: "MatchWeek",
  data: () => ({
    matchWeek: null
  }),
  components: {
    MatchWeekOverviewSmAndUp: () =>
      import("@/views/match_week/MatchWeekOverviewSmAndUp"),
    ContentSection: () => import("@/components/ContentSection"),
    LazyMatchList: () => import("@/views/match/LazyMatchList"),
    LazyD11MatchList: () => import("@/views/d11_match/LazyD11MatchList"),
    MatchWeekStats: () => import("@/views/match_week/MatchWeekStats")
  },
  methods: {
    getMatchWeek: function() {
      new this.$d11BootApi.MatchWeekApi()
        .findMatchWeekById(this.$route.params.id)
        .then(result => (this.matchWeek = result));
    }
  },
  mounted() {
    this.getMatchWeek();
  },
  watch: {
    $route() {
      this.getMatchWeek();
    }
  }
};
</script>
