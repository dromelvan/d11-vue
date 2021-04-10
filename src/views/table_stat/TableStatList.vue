<template>
  <list-container columns class="tble-stat-list">
    <template v-slot:header>
      <table-stat-header :view="view" />
    </template>
    <div v-for="tableStat in tableStats" :key="tableStat.id">
      <table-stat :view="view" :tableStat="tableStat" />
      <v-divider />
    </div>
  </list-container>
</template>

<script>
export default {
  name: "TableStatList",
  props: {
    view: String,
    tableStats: Array
  },
  components: {
    ListContainer: () => import("@/components/ListContainer"),
    TableStatHeader: () => import("@/views/table_stat/TableStatHeader"),
    TableStat: () => import("@/views/table_stat/TableStat")
  }
};
</script>
