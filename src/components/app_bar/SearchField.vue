<template>
  <v-col cols="12" sm="6" md="3">
    <v-autocomplete
      v-model="selected"
      :items="items"
      :search-input.sync="search"
      solo
      flat
      dense
      hide-details
      hide-no-data
      no-filter
      return-object
      append-icon="mdi-magnify"
      label="Search..."
    >
      <template v-slot:item="data">
        <template>
          <v-list-item-avatar>
            <player-image :fileName="data.item.photoFileName" />
          </v-list-item-avatar>
          <v-list-item-content dark>
            <v-list-item-title class="player-name" v-html="data.item.name">
            </v-list-item-title>
            <v-list-item-subtitle
              class="team-name"
              v-html="data.item.team"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </template>

      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            Search for players, teams or D11 teams.
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-autocomplete>
  </v-col>
</template>

<script>
export default {
  name: "SearchField",
  data() {
    return {
      search: null,
      searchResult: null,
      items: [],
      selected: null
    };
  },
  components: {
    PlayerImage: () => import("@/components/image/PlayerImage")
  },
  methods: {
    performSearch: function(search) {
      if (search && search !== this.selected) {
        new this.$d11BootApi.SearchApi()
          .search(search)
          .then(result => (this.searchResult = result));
      }
    }
  },
  watch: {
    search(search) {
      clearTimeout(this._debouncedSearchTimerId);
      if (search) {
        this._debouncedSearchTimerId = setTimeout(() => {
          this.performSearch(search);
        }, 500);
      } else {
        this.items = [];
      }
    },
    searchResult(searchResult) {
      this.items = [];
      if (searchResult.players.length > 0) {
        this.items.push({ header: "Players" });

        var count = Math.min(10, searchResult.players.length);
        for (let i = 0; i < count; i++) {
          var player = searchResult.players[i];
          this.items.push({
            name: player.name,
            id: player.id,
            team: player.teamId === 1 ? "" : player.teamName,
            photoFileName: player.photoFileName
          });
        }

        if (searchResult.players.length > 10) {
          this.items.push({
            header:
              "... and " +
              (searchResult.players.length - 10) +
              " additional players"
          });
        }
      }
      if (searchResult.players.length === 0) {
        this.items.push({ header: "No players, teams or D11 teams found" });
      }
    },
    selected(selected) {
      this.$router.push({
        name: "player",
        params: { id: selected.id, seasonId: this.currentSeason().id }
      });
      this.search = null;
    }
  }
};
</script>

<style lang="scss">
// Scoping the css for the content dropdown doesn't work.
.v-autocomplete__content {
  max-height: unset !important;
  max-width: 100px !important;

  .v-list {
    background-color: $menu-background-color;

    .v-subheader {
      padding-left: 16px;
    }

    .v-subheader,
    .v-list-item__title {
      font-size: 1rem;
    }

    .v-list-item__title {
      color: var(--v-menuText-base);
    }

    .v-subheader,
    .v-list-item__subtitle {
      color: var(--v-menuText-darken2);
    }

    .v-list-item.v-list-item--highlighted {
      background-color: var(--v-highlight-base);
    }
    .v-list-item.v-list-item--highlighted:before {
      opacity: 0 !important;
    }
  }
}
</style>
