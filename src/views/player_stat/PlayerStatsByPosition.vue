<template>
  <v-lazy
    v-model="visible"
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
  >
    <loading-indicator v-if="!playerStatsByPosition" />

    <div class="player-stats" v-else>
      <player-stat-list
        v-for="position in Object.keys(playerStatsByPosition.positions)"
        :key="position"
        :context="position + 's'"
        :view="view"
        :playerStats="playerStatsByPosition.positions[position]"
      />
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
    PlayerStatList: () => import("@/views/player_stat/PlayerStatList")
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
