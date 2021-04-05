<template>
  <div class="match" v-if="match">
    <match-overview-sm-and-up v-if="smAndUp" :match="match" />

    <content-section>
      <v-container class="player-stats-container tabs-container">
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
              :findPlayerStatParams="{ matchId: match.id, teamId: teamId }"
              :playerStatsByPosition="
                teamId === match.homeTeam.id
                  ? homeTeamPlayerMatchStatsByPosition
                  : awayTeamPlayerMatchStatsByPosition
              "
              view="match"
              @visible="findPlayerMatchStats"
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
    match: null,
    homeTeamPlayerMatchStatsByPosition: null,
    awayTeamPlayerMatchStatsByPosition: null
  }),
  components: {
    MatchOverviewSmAndUp: () => import("@/views/match/MatchOverviewSmAndUp"),
    ContentSection: () => import("@/components/ContentSection"),
    TeamImage: () => import("@/components/image/TeamImage"),
    PlayerStatsByPosition: () =>
      import("@/views/player_stat/PlayerStatsByPosition")
  },
  methods: {
    findPlayerMatchStats(findPlayerStatParams) {
      new this.$d11BootApi.PlayerMatchStatApi()
        .findActivePlayerMatchStatByMatchIdAndTeamId(
          findPlayerStatParams.matchId,
          findPlayerStatParams.teamId
        )
        .then(result => {
          var playerMatchStatsByPosition = this.$d11Mapper.playerStatsByPosition(
            result
          );
          if (findPlayerStatParams.teamId === this.match.homeTeam.id) {
            this.homeTeamPlayerMatchStatsByPosition = playerMatchStatsByPosition;
          } else {
            this.awayTeamPlayerMatchStatsByPosition = playerMatchStatsByPosition;
          }
        });
    }
  },
  mounted() {
    new this.$d11BootApi.MatchApi()
      .findMatchById(this.$route.params.id)
      .then(result => (this.match = result));
  }
};
</script>
