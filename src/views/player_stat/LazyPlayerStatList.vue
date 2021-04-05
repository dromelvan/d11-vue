<template>
  <v-lazy
    v-model="visible"
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
  >
    <loading-indicator v-if="!playerStats" class="centered" />

    <player-stat-list
      v-else
      :context="context"
      :view="view"
      :playerStats="playerStats"
    />
  </v-lazy>
</template>

<script>
export default {
  name: "LazyPlayerStatList",
  props: {
    context: String,
    view: String,
    playerStats: Array
  },
  data: () => ({
    visible: false
  }),
  components: {
    LoadingIndicator: () => import("@/components/LoadingIndicator"),
    PlayerStatList: () => import("@/views/player_stat/PlayerStatList")
  },
  watch: {
    visible: function() {
      this.$emit("visible");
    }
  }
};
</script>

<style lang="scss" scoped>
.v-lazy {
  min-height: 300px;
}
</style>
