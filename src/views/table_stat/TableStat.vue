<template>
  <list-container-item
    class="table-stat-container"
    :to="to"
    v-bind:class="'ranking-' + tableStat.ranking"
  >
    <v-list-item-title class="table-stat">
      <template v-if="smAndUp">
        <!-- Ranking -------------->
        <div class="ranking emphasised">{{ tableStat.ranking }}</div>
        <div class="image">
          <template v-if="['team'].includes(view)">
            <team-image size="tiny" :id="tableStat.team.id" />
          </template>
          <template v-else>
            <d11-team-image size="tiny" :id="tableStat.d11_team.id" />
          </template>
        </div>
        <div class="name">
          <!-- Name ----------------->
          <template v-if="['team'].includes(view)">
            <template v-if="mdAndUp || tableStat.team.name.length < 20">
              {{ tableStat.team.name }}
            </template>
            <template v-else>
              {{ tableStat.team.shortName }}
            </template>
          </template>
          <template v-else>
            {{ tableStat.d11Team.name }}
          </template>
          <!-- Table up indicator --->
          <div
            class="table-up"
            v-if="tableStat.ranking < tableStat.previousRanking"
          >
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <table-up-icon />
                  +{{ tableStat.previousRanking - tableStat.ranking }}
                </span>
              </template>
              <span>
                Up {{ tableStat.previousRanking - tableStat.ranking }} positions
                from {{ tableStat.previousRanking }}
              </span>
            </v-tooltip>
          </div>
          <!-- Table down indicator -->
          <div
            class="table-down"
            v-if="tableStat.ranking > tableStat.previousRanking"
          >
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <table-down-icon />
                  -{{ tableStat.ranking - tableStat.previousRanking }}
                </span>
              </template>
              <span
                >Down
                {{ tableStat.ranking - tableStat.previousRanking }} positions
                from {{ tableStat.previousRanking }}
              </span>
            </v-tooltip>
          </div>
          <div class="winner emphasised" v-if="tableStat.ranking === 1">
            Winner
          </div>
        </div>
        <!-- Matches played -->
        <div class="matches-played stat after-main-item">
          {{ tableStat.matchesPlayed }}
        </div>
        <!-- Matches won ----->
        <div class="matches-won stat">{{ tableStat.matchesWon }}</div>
        <!-- Matches drawn --->
        <div class="matches-drawn stat">{{ tableStat.matchesDrawn }}</div>
        <!-- Matches lost ---->
        <div class="matches-lost stat">{{ tableStat.matchesLost }}</div>
        <!-- Goals for ------->
        <div class="goals-for stat">{{ tableStat.goalsFor }}</div>
        <!-- Goals against --->
        <div class="goals-against stat">{{ tableStat.goalsAgainst }}</div>
        <!-- Goal difference -->
        <div class="goal-difference stat">
          <template v-if="tableStat.goalDifference > 0">+</template>
          {{ tableStat.goalDifference }}
        </div>
        <!-- Form ------------>
        <div class="form" v-if="mdAndUp">
          <result-indicator
            v-for="formMatchPoint in formMatchPoints"
            :key="formMatchPoint.index"
            :formMatchPoint="formMatchPoint"
          />
        </div>
        <!-- Points ---------->
        <div class="points stat emphasised">{{ tableStat.points }}</div>
      </template>
    </v-list-item-title>
  </list-container-item>
</template>

<script>
export default {
  name: "TableStat",
  props: {
    tableStat: Object,
    view: String
  },
  components: {
    ListContainerItem: () => import("@/components/ListContainerItem"),
    TeamImage: () => import("@/components/image/TeamImage"),
    D11TeamImage: () => import("@/components/image/D11TeamImage"),
    TableUpIcon: () => import("@/components/image/TableUpIcon"),
    TableDownIcon: () => import("@/components/image/TableDownIcon"),
    ResultIndicator: () => import("@/components/ResultIndicator")
  },
  computed: {
    to() {
      if (this.view === "team") {
        return { name: "team", params: { id: this.tableStat.team.id } };
      } else if (this.view === "d11Team") {
        return { name: "d11Team", params: { id: this.tableStat.d11Team.id } };
      }
      return null;
    },
    formMatchPoints() {
      var formMatchPoints = [];
      this.tableStat.formMatchPoints.forEach(function(item, index) {
        formMatchPoints.push({ index: index, points: item });
      });
      return formMatchPoints;
    }
  }
};
</script>

<style lang="scss" scoped>
.ranking {
  min-width: 3em;
}

.image {
  min-width: 38px;
  .team-image,
  .d11-team-image {
    padding-right: $d11-spacer;
  }
}

.table-up,
.table-down,
.winner {
  display: inline;
  padding-left: $d11-spacer;
}
.stat {
  min-width: 3.8em;
}

.form {
  min-width: 165px;
}

.status-pending,
.status-active {
  .winner {
    display: none;
  }
}

.premier-league {
  .ranking-1 {
    background-color: var(--v-primary-base);
  }

  .ranking-2,
  .ranking-3,
  .ranking-4 {
    background-color: var(--v-highlight-base);
  }

  .ranking-18,
  .ranking-19,
  .ranking-20 {
    background-color: var(--v-secondary-lighten2);
  }

  // Have to do this ugly thing because Vuetify changes the color to black when it's a list item to a route.
  .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled).ranking-1,
  .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled).ranking-2,
  .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled).ranking-3,
  .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled).ranking-4,
  .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled).ranking-18,
  .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled).ranking-19,
  .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled).ranking-20 {
    color: white !important;
  }
}
</style>
