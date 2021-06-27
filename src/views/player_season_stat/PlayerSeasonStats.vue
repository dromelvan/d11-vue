<template>
  <v-lazy
    v-model="visible"
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
  >
    <loading-indicator v-if="!playerSeasonStats" />

    <div class="player-season-stats" v-else>
      <player-season-stat-list
        v-for="key in ['key']"
        :key="key"
        :view="view"
        :playerSeasonStats="playerSeasonStats"
      />
    </div>
  </v-lazy>
</template>

<script>
export default {
  name: "PlayerSeasonStats",
  data: () => ({
    visible: false
  }),
  props: {
    playerSeasonStats: Array,
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
      if (this.visible && this.playerSeasonStats == null) {
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
