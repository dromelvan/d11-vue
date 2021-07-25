<template>
  <v-btn
    color="white"
    :height="size + padding"
    :width="size + padding"
    icon
    dark
    :to="to"
    class="navigation-btn"
  >
    <v-img
      v-if="direction === 'left'"
      :height="size"
      :width="size"
      src="~@/assets/images/chevron-left-dark.png"
    />

    <v-img
      v-if="direction === 'right'"
      :height="size"
      :width="size"
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
    size: {
      type: Number,
      default: 50
    },
    padding: {
      type: Number,
      default: 20
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
