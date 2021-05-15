<template>
  <v-lazy
    v-model="visible"
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
  >
    <loading-indicator v-if="!seasonStats" class="centered" />

    <league-table v-else :view="view" :seasonStats="seasonStats" />
  </v-lazy>
</template>

<script>
export default {
  name: "LazyLeagueTable",
  props: {
    view: String,
    seasonStats: Array
  },
  data: () => ({
    visible: false
  }),
  components: {
    LoadingIndicator: () => import("@/components/LoadingIndicator"),
    LeagueTable: () => import("./LeagueTable")
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
