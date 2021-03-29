<template>
  <div class="match" v-if="match">
    <match-overview-sm-and-up v-if="smAndUp" :match="match" />

    <content-section>
      <v-container class="player-stats-container">
        <v-tabs :grow="xs" class="player-stats-tabs">
          <v-tab class="player-stats-tab">
            <team-image :size="'tiny'" :id="match.homeTeam.id" />
            <span v-if="smAndUp">{{ match.homeTeam.name }} Stats</span>
            <span v-if="xs">{{ match.homeTeam.shortName }}</span>
          </v-tab>
          <v-tab class="player-stats-tab">
            <team-image :size="'tiny'" :id="match.awayTeam.id" />
            <span v-if="smAndUp">{{ match.awayTeam.name }} Stats</span>
            <span v-if="xs">{{ match.awayTeam.shortName }}</span>
          </v-tab>

          <v-tab-item
            v-for="teamId in [match.homeTeam.id, match.awayTeam.id]"
            :key="teamId"
          >
            <player-stats-by-position
              :filterId1="match.id"
              :filterId2="teamId"
              :view="'match'"
            />
          </v-tab-item>
        </v-tabs>
      </v-container>
    </content-section>
  </div>
</template>

<script>
export default {
  name: "Match",
  data: () => ({
    match: null
  }),
  components: {
    MatchOverviewSmAndUp: () => import("@/views/match/MatchOverviewSmAndUp"),
    ContentSection: () => import("@/components/ContentSection"),
    TeamImage: () => import("@/components/image/TeamImage"),
    PlayerStatsByPosition: () =>
      import("@/views/player_stat/PlayerStatsByPosition")
  },
  mounted() {
    new this.$d11BootApi.MatchApi()
      .findMatchById(this.$route.params.id)
      .then(result => (this.match = result));
  }
};
</script>

<style lang="scss" scoped>
.v-tab {
  letter-spacing: 0;
}
.player-stats-container {
  padding: 0px;
}
</style>
