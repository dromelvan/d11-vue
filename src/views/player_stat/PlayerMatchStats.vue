<template>
  <v-lazy
    v-model="visible"
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
  >
    <loading-indicator v-if="!playerMatchStats" />

    <div class="player-stats" v-else>
      <player-stat-list :view="view" :playerStats="playerMatchStats" />
    </div>
  </v-lazy>
</template>

<script>
export default {
  name: "PlayerMatchStats",
  data: () => ({
    visible: false
  }),
  props: {
    findPlayerMatchStatParams: Object,
    playerMatchStats: Array,
    view: String
  },
  components: {
    LoadingIndicator: () => import("@/components/LoadingIndicator"),
    PlayerStatList: () => import("@/views/player_stat/PlayerStatList")
  },
  watch: {
    visible: function() {
      this.$emit("getPlayerMatchStats");
    },
    playerMatchStats: function() {
      if (this.visible && this.playerMatchStats == null) {
        this.$emit("getPlayerMatchStats");
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
