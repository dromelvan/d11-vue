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
    visible: false
  }),
  props: {
    findPlayerStatParams: Object,
    playerStatsByPosition: Object,
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
  watch: {
    visible: function() {
      this.$emit("visible", this.findPlayerStatParams);
    }
  }
};
</script>

<style lang="scss" scoped>
.v-lazy {
  min-height: 250px;
}
</style>
