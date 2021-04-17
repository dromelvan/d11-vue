<template>
  <v-progress-circular
    class="progress"
    :rotate="-90"
    :size="35"
    :width="5"
    :value="this.elapsed(this.elapsedTime)"
    color="brand"
  >
    {{ this.elapsedTime }}
  </v-progress-circular>
</template>

<script>
export default {
  name: "Elapsed",
  props: {
    elapsedTime: String
  }
};
</script>

<style lang="scss">
.progress {
  margin-right: 100px !important;
}
</style>
