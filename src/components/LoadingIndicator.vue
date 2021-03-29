<template>
  <v-progress-circular
    :size="size"
    color="grey"
    indeterminate
  ></v-progress-circular>
</template>

<script>
export default {
  name: "LoadingIndicator",
  props: {
    size: {
      type: Number,
      default: 70
    }
  }
};
</script>

<style lang="scss" scoped>
.v-progress-circular {
  position: absolute;
  left: 0;
  right: 0;
  top: 160px;
  margin-left: auto;
  margin-right: auto;
  width: 100px; /* Need a specific value to work */
}
</style>
