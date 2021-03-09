<template>
  <section class="overview-section">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: "OverviewSection"
};
</script>

<style lang="scss" scoped>
.overview-section {
  position: relative;
  overflow: hidden;
  color: white;
  background: black;
}
</style>

<style lang="scss">
.overview-section {
  .container,
  .overview-navigation,
  .overview-content-background {
    position: relative;
    z-index: 1;
  }
}
</style>
