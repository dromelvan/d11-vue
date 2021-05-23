<template>
  <div class="overview-content-background">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "OverviewContent"
};
</script>

<style lang="scss" scoped>
.overview-content-background {
  min-height: 80px;
  padding-bottom: $d11-large-spacer;
}
</style>
