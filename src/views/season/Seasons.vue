<template>
  <v-container>
    <h1>Season History</h1>

    <p>Winners and runners up of the current and previous seasons.</p>

    <season
      v-for="seasonId in seasonIds"
      :key="seasonId"
      :seasonId="seasonId"
    />
  </v-container>
</template>

<script>
export default {
  name: "Seasons",
  data: () => ({
    seasonIds: null
  }),
  components: {
    Season: () => import("@/views/season/Season")
  },
  mounted() {
    new this.$d11BootApi.SeasonApi()
      .findAllSeasons()
      .then(result => (this.seasonIds = result));
  }
};
</script>
