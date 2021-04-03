<template>
  <v-container class="overview-spacer">
    <slot></slot>
  </v-container>
</template>

<script>
export default {
  name: "OverviewSpacer"
};
</script>

<style lang="scss" scoped>
.overview-spacer {
  height: $overview-spacer-height;
  display: flex;
  align-items: center;
}
</style>
