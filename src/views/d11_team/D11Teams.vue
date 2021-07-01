<template>
  <div class="d11-teams" v-if="season">
    <d11-teams-overview-sm-and-up v-if="smAndUp" :season="season" />

    <content-section>
      <v-container class="d11-teams-container">
        <v-row>
          <d11-team-card
            v-for="d11Team in d11Teams"
            :key="d11Team.id"
            :d11Team="d11Team"
            :season="season"
          />
        </v-row>
      </v-container>
    </content-section>
  </div>
</template>

<script>
import SeasonService from "@/services/season.service";
import D11TeamService from "@/services/d11Team.service";

export default {
  name: "D11Teams",
  data: () => ({
    season: null,
    d11Teams: null
  }),
  components: {
    D11TeamsOverviewSmAndUp: () =>
      import("@/views/d11_team/D11TeamsOverviewSmAndUp"),
    ContentSection: () => import("@/components/ContentSection"),
    D11TeamCard: () => import("@/views/d11_team/D11TeamCard")
  },
  methods: {
    getSeason: function() {
      this.d11Teams = null;
      SeasonService.getSeason(this.$route.params.seasonId).then(result => {
        this.season = result;
        D11TeamService.getD11TeamsBySeason(this.$route.params.seasonId).then(
          result => {
            this.d11Teams = result;
          }
        );
      });
    }
  },
  mounted() {
    this.getSeason();
  },
  watch: {
    $route() {
      if (
        this.season == null ||
        this.$route.params.seasonId != this.season.id
      ) {
        this.getSeason();
      }
    }
  }
};
</script>
