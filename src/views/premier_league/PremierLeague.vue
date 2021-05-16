<template>
  <div
    class="premier-league"
    v-if="premierLeague"
    v-bind:class="'status-' + premierLeague.season.status.toLowerCase()"
  >
    <premier-league-overview-sm-and-up
      v-if="smAndUp"
      :premierLeague="premierLeague"
    />

    <content-section>
      <v-container class="tabs-container">
        <v-tabs v-model="tab">
          <v-tab class="league-table-tab" href="#table">
            League Table
          </v-tab>
          <v-tab class="match-weeks-tab" href="#matchWeeks">
            Match Weeks
          </v-tab>
          <v-tabs-items :value="tab">
            <v-tab-item value="table">
              <premier-league-table
                v-for="premierLeague in [this.premierLeague]"
                :key="premierLeague.id"
                :seasonId="premierLeague.season.id"
              />
            </v-tab-item>
            <v-tab-item value="matchWeeks">
              <premier-league-match-weeks
                v-for="premierLeague in [this.premierLeague]"
                :key="premierLeague.id"
                :premierLeagueId="premierLeague.id"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-container>
    </content-section>
  </div>
</template>

<script>
export default {
  name: "PremierLeague",
  data: () => ({
    premierLeague: null
  }),
  components: {
    PremierLeagueOverviewSmAndUp: () =>
      import("@/views/premier_league/PremierLeagueOverviewSmAndUp"),
    ContentSection: () => import("@/components/ContentSection"),
    PremierLeagueTable: () =>
      import("@/views/premier_league/PremierLeagueTable"),
    PremierLeagueMatchWeeks: () =>
      import("@/views/premier_league/PremierLeagueMatchWeeks")
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
    getPremierLeague: function() {
      new this.$d11BootApi.PremierLeagueApi()
        .findPremierLeagueById(this.$route.params.id)
        .then(result => (this.premierLeague = result));
    }
  },
  mounted() {
    this.getPremierLeague();
  },
  watch: {
    $route() {
      this.getPremierLeague();
    }
  }
};
</script>
