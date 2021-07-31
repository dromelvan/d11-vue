<template>
  <v-app
    :class="{
      'v-application-xs': $vuetify.breakpoint.xs,
      'v-application-sm': $vuetify.breakpoint.sm,
      'v-application-md': $vuetify.breakpoint.md,
      'v-application-lg': $vuetify.breakpoint.lg,
      'v-application-xl': $vuetify.breakpoint.xl
    }"
  >
    <template v-if="$vuetify.breakpoint.smAndDown">
      <app-bar-sm-and-down />
      <navigation-drawer />
    </template>

    <app-bar-md-and-up class="app-bar" v-if="$vuetify.breakpoint.mdAndUp" />

    <v-main>
      <router-view />
    </v-main>
    <d11-footer />
  </v-app>
</template>

<script>
import InitializationService from "@/services/initialization.service";

export default {
  name: "App",

  components: {
    AppBarSmAndDown: () => import("@/components/app_bar/AppBarSmAndDown"),
    NavigationDrawer: () => import("@/components/app_bar/NavigationDrawer"),
    AppBarMdAndUp: () => import("@/components/app_bar/AppBarMdAndUp"),
    D11Footer: () => import("@/components/D11Footer")
  },
  mounted() {
    InitializationService.initialize();
  }
};
</script>

<style lang="scss">
.container {
  max-width: $d11-app-width !important;
}
</style>
