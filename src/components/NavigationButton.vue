<template>
  <v-btn
    color="white"
    :height="height + 20"
    :width="width + 20"
    icon
    dark
    :to="to"
    class="navigation-btn"
  >
    <v-img
      v-if="direction === 'left'"
      :height="height"
      :width="width"
      src="~@/assets/images/chevron-left-dark.png"
    />

    <v-img
      v-if="direction === 'right'"
      :height="height"
      :width="width"
      src="~@/assets/images/chevron-right-dark.png"
    />
  </v-btn>
</template>

<script>
export default {
  name: "NavigationButton",
  props: {
    to: Object,
    direction: String,
    height: {
      type: Number,
      default: 50
    },
    width: {
      type: Number,
      default: 50
    }
  }
};
</script>

<style lang="scss" scoped>
.theme--dark.v-btn--active:hover::before,
.theme--dark.v-btn--active::before {
  opacity: 0;
}
</style>
