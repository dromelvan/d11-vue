<template>
  <div class="overview-navigation">
    <v-container v-if="smAndUp">
      <router-link :to="link">
        <v-icon>mdi-chevron-left</v-icon><span>{{ text }}</span>
      </router-link>
    </v-container>
    <router-link :to="link" v-if="xs">
      <v-container>
        <v-icon>mdi-chevron-left</v-icon><span>{{ text }}</span>
      </v-container>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "OverviewNavigation",
  props: {
    link: Object,
    text: String
  }
};
</script>

<style lang="scss" scoped>
.overview-navigation {
  background: $overview-dark-background-color;

  span {
    vertical-align: middle;
    font-size: 22px;
    font-weight: 700;
  }

  .v-icon {
    font-size: 1.8em;
    color: $overview-color;
  }

  a {
    color: $overview-color;
    text-decoration: none;
  }
}
</style>
