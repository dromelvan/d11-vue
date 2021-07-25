<template>
  <list-container columns class="player-stat-list">
    <template v-slot:header>
      <player-stats-header :context="context" :view="view" />
    </template>
    <div v-for="playerStat in playerStats" :key="playerStat.id">
      <player-stat :view="view" :d11Match="d11Match" :playerStat="playerStat" />
      <v-divider />
    </div>
  </list-container>
</template>

<script>
export default {
  name: "PlayerStatList",
  props: {
    context: String,
    view: String,
    d11Match: Object,
    playerStats: Array
  },
  components: {
    ListContainer: () => import("@/components/ListContainer"),
    PlayerStatsHeader: () => import("@/views/player_stat/PlayerStatsHeader"),
    PlayerStat: () => import("@/views/player_stat/PlayerStat")
  }
};
</script>

<style lang="scss" scoped>
.player-stat-list {
  padding-top: 0;
}
</style>
