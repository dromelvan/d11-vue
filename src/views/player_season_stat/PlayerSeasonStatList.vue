<template>
  <list-container columns class="player-season-stat-list">
    <template v-slot:header>
      <player-season-stats-header :context="context" :view="view" />
    </template>
    <div
      v-for="playerSeasonStat in playerSeasonStats"
      :key="playerSeasonStat.id"
    >
      <player-season-stat :view="view" :playerSeasonStat="playerSeasonStat" />
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
    playerSeasonStats: Array
  },
  components: {
    ListContainer: () => import("@/components/ListContainer"),
    PlayerSeasonStatsHeader: () =>
      import("@/views/player_season_stat/PlayerSeasonStatsHeader"),
    PlayerSeasonStat: () =>
      import("@/views/player_season_stat/PlayerSeasonStat")
  }
};
</script>

<style lang="scss" scoped>
.player-season-stat-list {
  padding-top: 0;
}
</style>
