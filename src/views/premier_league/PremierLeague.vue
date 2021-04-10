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
        <v-tabs>
          <v-tab class="league-table-tab">
            League Table
          </v-tab>
          <v-tab class="match-weeks-tab">
            Match Weeks
          </v-tab>
          <v-tab-item>
            <premier-league-table
              v-for="premierLeague in [this.premierLeague]"
              :key="premierLeague.id"
              :premierLeagueId="premierLeague.id"
            />
          </v-tab-item>
          <v-tab-item>
            Match weeks
          </v-tab-item>
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
      import("@/views/premier_league/PremierLeagueTable")
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
