<template>
  <v-lazy
    v-model="visible"
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
  >
    <loading-indicator v-if="!playerSeasonStatsByPosition" />

    <div class="player-season-stats" v-else>
      <player-season-stat-list
        v-for="position in Object.keys(playerSeasonStatsByPosition.positions)"
        :key="position"
        :context="position + 's'"
        :view="view"
        :playerSeasonStats="playerSeasonStatsByPosition.positions[position]"
      />
    </div>
  </v-lazy>
</template>

<script>
export default {
  name: "PlayerSeasonStatsByPositions",
  data: () => ({
    visible: false
  }),
  props: {
    playerSeasonStatsByPosition: Object,
    view: String
  },
  components: {
    LoadingIndicator: () => import("@/components/LoadingIndicator"),
    PlayerSeasonStatList: () =>
      import("@/views/player_season_stat/PlayerSeasonStatList")
  },
  watch: {
    visible: function() {
      this.$emit("findPlayerSeasonStats");
    },
    playerSeasonStatsByPosition: function() {
      if (this.visible && this.playerSeasonStatsByPosition == null) {
        this.$emit("findPlayerSeasonStats");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-lazy {
  min-height: 250px;
}
</style>
