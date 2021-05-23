<template>
  <div class="season" v-if="season">
    <season-overview-sm-and-up v-if="smAndUp" :season="season" />

    <content-section>
      <v-container class="tabs-container">
        <v-tabs v-model="tab">
          <v-tab class="match-weeks-tab" href="#match-weeks">
            Match Weeks
          </v-tab>
          <v-tab class="premier-league-table-tab" href="#premier-league-table">
            Premier League Table
          </v-tab>
          <v-tab class="d11-league-table-tab" href="#d11-league-table">
            D11 League Table
          </v-tab>
          <v-tabs-items :value="tab">
            <v-tab-item value="match-weeks">
              <lazy-match-week-list
                v-for="season in [this.season]"
                :key="season.id"
                :matchWeekIds="season.matchWeeks"
              />
            </v-tab-item>
            <v-tab-item value="premier-league-table">
              <premier-league-table
                v-for="season in [this.season]"
                :key="season.id"
                :seasonId="season.id"
              />
            </v-tab-item>
            <v-tab-item value="d11-league-table">
              <p>D11 table</p>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-container>
    </content-section>
  </div>
</template>

<script>
export default {
  name: "Season",
  data: () => ({
    season: null
  }),
  components: {
    SeasonOverviewSmAndUp: () => import("@/views/season/SeasonOverviewSmAndUp"),
    ContentSection: () => import("@/components/ContentSection"),
    LazyMatchWeekList: () => import("@/views/match_week/LazyMatchWeekList"),
    PremierLeagueTable: () =>
      import("@/views/premier_league/PremierLeagueTable")
  },
  computed: {
    tab: {
      set(tab) {
        this.$router.replace({ params: { ...this.$route.params.tab, tab } });
      },
      get() {
        return this.$route.params.tab;
      }
    }
  },
  methods: {
    getSeason: function() {
      new this.$d11BootApi.SeasonApi()
        .findSeasonById(this.$route.params.id)
        .then(result => (this.season = result));
    }
  },
  mounted() {
    this.getSeason();
  },
  watch: {
    $route() {
      this.getSeason();
    }
  }
};
</script>
