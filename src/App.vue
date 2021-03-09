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
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
.container {
  max-width: $d11-app-width !important;
}
</style>
