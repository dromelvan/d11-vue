<template>
  <v-navigation-drawer v-model="show" app dark temporary>
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

<style scoped>
.v-subheader {
  text-transform: uppercase;
}
</style>
