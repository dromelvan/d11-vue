<template>
  <v-app-bar app color="primary" src="@/assets/images/app-bar-background.png">
    <template v-slot:default>
      <div>
        <v-img class="d11-logo" alt="D11" src="@/assets/images/d11-logo.png" />
      </div>

      <v-spacer></v-spacer>

      <search-field />
    </template>
    <template v-slot:extension>
      <v-menu
        open-on-hover
        v-for="navigationGroup in navigationGroups"
        :key="navigationGroup.header"
        offset-y
        dark
        transition="scale-transition"
        auto
        origin="top center"
      >
        <template v-slot:activator="{ on }">
          <a style="color: white; padding-right: 1em" v-on="on">
            {{ navigationGroup.header }}
            <v-icon style="color: white">mdi-chevron-down</v-icon>
          </a>
        </template>
        <v-list>
          <v-list-item
            v-for="link in navigationGroup.links"
            :key="link.text"
            exact
            router
            :to="{ name: link.route }"
          >
            <v-list-item-title>
              {{ link.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script>
import navigationGroups from "./navigation";

export default {
  name: "AppBarMdAndUp",
  components: {
    SearchField: () => import("@/components/app_bar/SearchField")
  },
  data: () => ({
    navigationGroups: navigationGroups
  })
};
</script>

<style lang="scss" scoped>
@media only screen and (min-width: $d11-app-width) {
  .app-bar ::v-deep .v-toolbar__content,
  .app-bar ::v-deep .v-toolbar__extension {
    width: $d11-app-width;
    margin: auto;
  }
}
</style>
