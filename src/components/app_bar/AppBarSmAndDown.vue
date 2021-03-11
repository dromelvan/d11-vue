<template>
  <v-app-bar
    app
    color="primary"
    src="@/assets/images/app-bar-background-sm-and-down.png"
  >
    <template v-slot:default>
      <v-app-bar-nav-icon dark @click="show()"></v-app-bar-nav-icon>
      <v-img
        class="d11-logo"
        alt="D11"
        contain
        max-height="38px"
        :position="imagePosition"
        src="@/assets/images/d11-logo.png"
      />
      <search-field v-if="smAndUp" />
      <v-btn v-else to="search" icon dark>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBarSmAndDown",
  components: {
    SearchField: () => import("@/components/app_bar/SearchField")
  },
  computed: {
    imagePosition: function() {
      if (this.xs) {
        return "center center";
      } else {
        return "left center";
      }
    }
  },
  methods: {
    show: function() {
      this.$parent.$emit("navigationDrawer.show", true);
    }
  }
};
</script>
