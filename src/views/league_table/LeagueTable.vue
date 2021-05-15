<template>
  <list-container columns class="tble-stat-list">
    <template v-slot:header>
      <league-table-header :view="view" />
    </template>
    <div v-for="seasonStat in seasonStats" :key="seasonStat.id">
      <league-table-row :view="view" :seasonStat="seasonStat" />
      <v-divider />
    </div>
  </list-container>
</template>

<script>
export default {
  name: "LeagueTable",
  props: {
    view: String,
    seasonStats: Array
  },
  components: {
    ListContainer: () => import("@/components/ListContainer"),
    LeagueTableHeader: () => import("./LeagueTableHeader"),
    LeagueTableRow: () => import("./LeagueTableRow")
  }
};
</script>
