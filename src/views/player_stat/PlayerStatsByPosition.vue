<template>
  <v-lazy
    v-model="visible"
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
  >
    <loading-indicator v-if="!playerStatsByPosition" />

    <div class="player-stats" v-else>
      <list-container
        columns
        class="position-stats"
        v-for="position in Object.keys(playerStatsByPosition.positions)"
        :key="position"
      >
        <template v-slot:header>
          <player-stats-header :position="position" :view="view" />
        </template>

        <div
          v-for="playerStat in playerStatsByPosition.positions[position]"
          :key="playerStat.id"
        >
          <player-stat :view="view" :playerStat="playerStat" />
          <v-divider />
        </div>
      </list-container>
      <v-container class="total-points" v-if="showTotalPoints">
        Total: {{ playerStatsByPosition.totalPoints }}
      </v-container>
    </div>
  </v-lazy>
</template>

<script>
export default {
  name: "PlayerStatsByPositions",
  data: () => ({
    visible: false,
    playerStatsByPosition: null
  }),
  props: {
    filterId1: Number,
    filterId2: Number,
    view: String,
    showTotalPoints: {
      type: Boolean,
      default: false
    }
  },
  components: {
    LoadingIndicator: () => import("@/components/LoadingIndicator"),
    ListContainer: () => import("@/components/ListContainer"),
    PlayerStatsHeader: () => import("@/views/player_stat/PlayerStatsHeader"),
    PlayerStat: () => import("@/views/player_stat/PlayerStat")
  },
  methods: {
    getPlayerStats() {
      if (this.view === "match") {
        return new this.$d11BootApi.PlayerMatchStatApi().findActivePlayerMatchStatByMatchIdAndTeamId(
          this.filterId1,
          this.filterId2
        );
      }
    }
  },
  watch: {
    visible: function() {
      this.getPlayerStats().then(result => {
        this.playerStatsByPosition = this.$d11Mapper.playerStatsByPosition(
          result
        );
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.v-lazy {
  min-height: 250px;
}
</style>
