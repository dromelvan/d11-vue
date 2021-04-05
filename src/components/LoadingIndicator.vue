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
  width: 70px;
  height: 70px;
  left: 50%;
  top: 160px;
  margin-left: -35px;
}

.v-progress-circular.centered {
  top: 50%;
  margin-top: -35px;
}
</style>
