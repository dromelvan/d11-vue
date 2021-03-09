<template>
  <v-container class="overview-context-container">
    <div class="overview-context">
      <slot></slot>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "OverviewContext"
};
</script>

<style lang="scss" scoped>
.overview-context-container {
  padding-bottom: 0;

  .overview-context {
    display: flex;
    padding: 0.75em;
    line-height: 1.8em;
    background-color: $overview-context-background-color;

    .v-icon {
      color: $overview-color;
    }

    .v-icon.overview-context-icon {
      padding-left: 0.5em;
      padding-right: 0.25em;
    }

    .overview-context-link-container {
      margin-left: auto;
      a {
        color: $overview-color;
        text-decoration: none;
      }
    }
  }
}
</style>
