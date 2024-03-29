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
            :to="link.route"
          >
            <v-list-item-title>
              {{ link.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-spacer></v-spacer>

      <signup-dialog
        @logging-in="onLoggingIn"
        v-if="!loggedIn() || loggingIn"
      />
      <login-dialog @logging-in="onLoggingIn" v-if="!loggedIn() || loggingIn" />

      <v-menu
        open-on-hover
        transition="slide-y-transition"
        offset-y
        tile
        v-if="loggedIn() && !loggingIn && activeD11Team() && currentSeason()"
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" :ripple="false" text dark>
            <template v-if="!administrator()">
              <d11-team-image
                size="tiny"
                :id="activeD11Team().id"
                v-if="activeD11Team().id > 0"
              />
              {{ activeD11Team().name }}
            </template>
            <template v-else>
              Admin
            </template>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-if="!administrator() && activeD11Team().id > 0"
            router
            :ripple="false"
            :to="{
              name: 'd11Team',
              params: { id: activeD11Team().id, seasonId: currentSeason().id }
            }"
          >
            <v-list-item-title>
              My Team
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="link" @click="logout()">
            <v-list-item-title>
              Sign Out
            </v-list-item-title>
          </v-list-item>
          <change-password-dialog>
            <template v-slot:activator="{ open }">
              <v-list-item class="link" @click="openDialog(open)">
                <v-list-item-title>Change Password</v-list-item-title>
              </v-list-item>
            </template>
          </change-password-dialog>

          <create-player-dialog v-if="administrator()">
            <template v-slot:activator="{ open }">
              <v-list-item class="link" @click="openDialog(open)">
                <v-list-item-title>Add New Player</v-list-item-title>
              </v-list-item>
            </template>
          </create-player-dialog>
        </v-list>
      </v-menu>

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
    SignupDialog: () => import("@/views/authentication/SignupDialog"),
    ChangePasswordDialog: () =>
      import("@/views/authentication/ChangePasswordDialog"),
    CreatePlayerDialog: () => import("@/views/admin/CreatePlayerDialog"),
    D11TeamImage: () => import("@/components/image/D11TeamImage"),
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
    logout: function() {
      AuthenticationService.logout();
      this.$router.push({
        name: "home"
      });
    },
    openDialog: function(method) {
      setTimeout(() => method());
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

@media print {
  .app-bar {
    display: none !important;
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

.d11-team-image {
  margin-right: $d11-spacer;
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
      text-transform: uppercase;
      font-size: 14px;
      font-weight: 600;
      color: var(--v-menuText-base);
    }

    .v-list-item.link {
      cursor: pointer;
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
