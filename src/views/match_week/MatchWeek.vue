<template>
  <div class="match-day" v-if="matchWeek">
    <match-week-overview-sm-and-up v-if="smAndUp" :matchWeek="matchWeek" />

    <content-section>
      <v-container class="tabs-container">
        <v-tabs>
          <v-tab class="matches-tab">
            Fixtures and Results
          </v-tab>
          <v-tab class="stats-tab">
            Statistics
          </v-tab>

          <v-tab-item>
            <list-container
              class="date-match-list"
              v-for="date in Object.keys(matchWeek.matches)"
              :key="date"
            >
              <template v-slot:header>
                <div class="match-week-date list-container-header">
                  {{ date | moment("dddd, MMMM Do YYYY") }}
                </div>
              </template>
              <div v-for="matchId in matchWeek.matches[date]" :key="matchId">
                <list-container-item
                  :to="{ name: 'match', params: { id: matchId } }"
                >
                  <match-week-match-sm-and-up
                    v-if="smAndUp"
                    :matchId="matchId"
                  />
                </list-container-item>
                <v-divider />
              </div>
            </list-container>
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
    ListContainer: () => import("@/components/ListContainer"),
    ListContainerItem: () => import("@/components/ListContainerItem"),
    MatchWeekMatchSmAndUp: () =>
      import("@/views/match_week/MatchWeekMatchSmAndUp"),
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
