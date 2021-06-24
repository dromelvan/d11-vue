<template>
  <v-app-bar app color="brand" src="@/assets/images/app-bar-background.png">
    <template v-slot:default>
      <div>
        <v-img
          class="d11-logo"
          height="40"
          alt="D11"
          contain
          src="@/assets/images/d11-logo.png"
        />
      </div>

      <v-menu
        v-for="navigationGroup in navigationGroups"
        :key="navigationGroup.header"
        :nudge-left="navigationGroup.nudgeLeft"
        open-on-hover
        transition="slide-y-transition"
        offset-y
        tile
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" :ripple="false" text dark>
            {{ navigationGroup.header }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="link in navigationGroup.links"
            :key="link.text"
            exact
            router
            :ripple="false"
            :to="{ name: link.route }"
          >
            <v-list-item-title>
              {{ link.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-spacer></v-spacer>

      <login-dialog @logging-in="onLoggingIn" v-if="!loggedIn() || loggingIn" />
      <!--
      <a class="menu-link" v-if="!loggedIn() || loggingIn" @click="login()">
        Sign Up
      </a>
      -->
      <a class="menu-link" v-if="loggedIn() && !loggingIn" @click="logout()">
        Sign Out
      </a>

      <search-field />
    </template>
  </v-app-bar>
</template>

<script>
import AuthenticationService from "@/services/authentication.service";
import navigationGroups from "./navigation";

export default {
  name: "AppBarMdAndUp",
  components: {
    LoginDialog: () => import("@/views/authentication/LoginDialog"),
    SearchField: () => import("@/components/app_bar/SearchField")
  },
  data: () => ({
    navigationGroups: navigationGroups,
    loggingIn: false
  }),
  methods: {
    onLoggingIn: function(value) {
      this.loggingIn = value;
    },
    login: function() {
      AuthenticationService.login({
        username: "dromelvan@aland.net",
        password: "mj521jmw0w"
      });
    },
    logout: function() {
      AuthenticationService.logout();
    }
  }
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

// Tweak the visible menu buttons.
.v-btn:before {
  background-color: inherit;
}

.v-btn.v-btn--text {
  letter-spacing: 0;
  font-weight: bold;
  justify-content: inherit;
}

// Tweak menu items.
.v-menu__content {
  .v-list {
    padding: 0px;
    // Have to use this instead of the theme colour since it seems Vuetify truncates
    // colour variables of the #000000de type
    background-color: $menu-background-color;

    .v-list-item__title {
      font-size: 1rem;
      color: var(--v-menuText-base);
    }

    .v-list-item:hover {
      background-color: var(--v-highlight-base);
    }
  }
}

// Adds the arrow at the top of the menu.
.v-menu__content {
  contain: initial;
  overflow: visible;
  border: 1px solid var(--v-menu-lighten3);
}
.v-menu__content::before {
  position: absolute;
  content: "";
  top: 0;
  left: calc(50% - 5px);
  transform: translateY(-100%);
  width: 5px;
  height: 5px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid var(--v-menu-lighten3);
}
</style>
