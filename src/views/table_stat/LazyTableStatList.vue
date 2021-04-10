<template>
  <v-lazy
    v-model="visible"
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
  >
    <loading-indicator v-if="!tableStats" class="centered" />

    <table-stat-list v-else :view="view" :tableStats="tableStats" />
  </v-lazy>
</template>

<script>
export default {
  name: "LazyTableStatList",
  props: {
    view: String,
    tableStats: Array
  },
  data: () => ({
    visible: false
  }),
  components: {
    LoadingIndicator: () => import("@/components/LoadingIndicator"),
    TableStatList: () => import("@/views/table_stat/TableStatList")
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
