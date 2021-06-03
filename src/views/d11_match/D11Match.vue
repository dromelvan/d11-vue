<template>
  <div class="d11-match" v-if="d11Match">
    <d11-match-overview-sm-and-up v-if="smAndUp" :d11Match="d11Match" />

    <content-section>
      <v-container class="player-stats-container tabs-container">
        <v-tabs :grow="xs" class="player-stats-tabs">
          <v-tab class="player-stats-tab">
            <d11-team-image :size="'tiny'" :id="d11Match.homeD11Team.id" />
            <span v-if="smAndUp">{{ d11Match.homeD11Team.name }} Stats</span>
            <span v-if="xs">{{ d11Match.homeD11Team.shortName }}</span>
          </v-tab>
          <v-tab class="player-stats-tab">
            <d11-team-image :size="'tiny'" :id="d11Match.awayD11Team.id" />
            <span v-if="smAndUp">{{ d11Match.awayD11Team.name }} Stats</span>
            <span v-if="xs">{{ d11Match.awayD11Team.shortName }}</span>
          </v-tab>

          <v-tab-item
            v-for="d11TeamId in [
              d11Match.homeD11Team.id,
              d11Match.awayD11Team.id
            ]"
            :key="d11TeamId"
          >
            <player-stats-by-position
              :findPlayerStatParams="{
                d11MatchId: d11Match.id,
                d11TeamId: d11TeamId
              }"
              :playerStatsByPosition="
                d11TeamId === d11Match.homeD11Team.id
                  ? homeD11TeamPlayerMatchStatsByPosition
                  : awayD11TeamPlayerMatchStatsByPosition
              "
              view="d11Match"
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
  name: "D11Match",
  data: () => ({
    d11Match: null,
    homeD11TeamPlayerMatchStatsByPosition: null,
    awayD11TeamPlayerMatchStatsByPosition: null
  }),
  components: {
    D11MatchOverviewSmAndUp: () =>
      import("@/views/d11_match/D11MatchOverviewSmAndUp"),
    ContentSection: () => import("@/components/ContentSection"),
    D11TeamImage: () => import("@/components/image/D11TeamImage"),
    PlayerStatsByPosition: () =>
      import("@/views/player_stat/PlayerStatsByPosition")
  },
  methods: {
    findPlayerMatchStats(findPlayerStatParams) {
      new this.$d11BootApi.PlayerMatchStatApi()
        .findPlayerMatchStatByD11MatchIdAndD11TeamId(
          findPlayerStatParams.d11MatchId,
          findPlayerStatParams.d11TeamId
        )
        .then(result => {
          var playerMatchStatsByPosition = this.$d11Mapper.playerStatsByPosition(
            result
          );
          if (findPlayerStatParams.d11TeamId === this.d11Match.homeD11Team.id) {
            this.homeD11TeamPlayerMatchStatsByPosition = playerMatchStatsByPosition;
          } else {
            this.awayD11TeamPlayerMatchStatsByPosition = playerMatchStatsByPosition;
          }
        });
    }
  },
  mounted() {
    new this.$d11BootApi.D11MatchApi()
      .findD11MatchById(this.$route.params.id)
      .then(result => (this.d11Match = result));
  }
};
</script>
