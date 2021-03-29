<template>
  <v-navigation-drawer v-model="show" app dark color="menu" temporary>
    <v-list nav flat dense>
      <v-list-item-group
        v-for="navigationGroup in navigationGroups"
        :key="navigationGroup.header"
      >
        <v-subheader>{{ navigationGroup.header }}</v-subheader>
        <v-list-item
          v-for="link in navigationGroup.links"
          :key="link.text"
          exact
          router
          :to="{ name: link.route }"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import navigationGroups from "./navigation";

export default {
  name: "NavigationDrawer",
  data: () => ({
    show: false,
    navigationGroups: navigationGroups
  }),
  mounted() {
    this.$parent.$on("navigationDrawer.show", show => {
      this.show = show;
    });
  }
};
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  background-color: $menu-background-color !important;

  .v-subheader,
  .v-list-item .v-list-item__title {
    font-size: 0.9rem;
  }
  .v-subheader {
    text-transform: uppercase;
  }
  .v-list-item--active {
    background-color: var(--v-highlight-base);
  }
}
</style>