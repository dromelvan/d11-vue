<template>
  <div class="season" v-if="season">
    <p>{{ season.name }}</p>
  </div>
</template>

<script>
export default {
  name: "Season",
  data: () => ({
    season: null
  }),
  methods: {
    getSeason: function() {
      new this.$d11BootApi.SeasonApi()
        .findSeasonById(this.$route.params.id)
        .then(result => (this.season = result));
    }
  },
  mounted() {
    this.getSeason();
  },
  watch: {
    $route() {
      this.getSeason();
    }
  }
};
</script>
