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
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>

      <v-list-item-group>
        <v-subheader>Account</v-subheader>
        <v-list-item v-if="!loggedIn() || loggingIn">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            <login-dialog @logging-in="onLoggingIn" />
          </v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="activeD11Team() && currentSeason()"
          router
          :to="{
            name: 'd11Team',
            params: { id: activeD11Team().id, seasonId: currentSeason().id }
          }"
        >
          <v-list-item-icon>
            <v-icon>mdi-shield-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ activeD11Team().name }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="loggedIn()"
          @click="
            logout();
            show = false;
          "
        >
          <v-list-item-icon>
            <v-icon>mdi-account-cancel</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Sign Out
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import navigationGroups from "./navigation";
import AuthenticationService from "@/services/authentication.service";

export default {
  name: "NavigationDrawer",
  data: () => ({
    show: false,
    navigationGroups: navigationGroups,
    loggingIn: false
  }),
  components: {
    LoginDialog: () => import("@/views/authentication/LoginDialog")
  },
  methods: {
    onLoggingIn: function(value) {
      this.loggingIn = value;
      this.show = false;
    },
    logout: function() {
      AuthenticationService.logout();
      this.$router.push({
        name: "home"
      });
    }
  },

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
