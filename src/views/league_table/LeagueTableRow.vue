<template>
  <list-container-item
    class="table-stat-container"
    :to="to"
    v-bind:class="'ranking-' + seasonStat.ranking"
  >
    <v-list-item-title class="table-stat">
      <template v-if="smAndUp">
        <!-- Ranking -------------->
        <div class="ranking emphasised">{{ seasonStat.ranking }}</div>
        <div class="image">
          <template v-if="['team'].includes(view)">
            <team-image size="tiny" :id="seasonStat.team.id" />
          </template>
          <template v-else>
            <d11-team-image size="tiny" :id="seasonStat.d11Team.id" />
          </template>
        </div>
        <div class="name">
          <!-- Name ----------------->
          <template v-if="['team'].includes(view)">
            <template v-if="mdAndUp || seasonStat.team.name.length < 20">
              {{ seasonStat.team.name }}
            </template>
            <template v-else>
              {{ seasonStat.team.shortName }}
            </template>
          </template>
          <template v-else>
            {{ seasonStat.d11Team.name }}
          </template>
          <!-- Table up indicator --->
          <div
            class="table-up"
            v-if="seasonStat.ranking < seasonStat.previousRanking"
          >
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <table-up-icon />
                  +{{ seasonStat.previousRanking - seasonStat.ranking }}
                </span>
              </template>
              <span>
                Up
                {{ seasonStat.previousRanking - seasonStat.ranking }} positions
                from {{ seasonStat.previousRanking }}
              </span>
            </v-tooltip>
          </div>
          <!-- Table down indicator -->
          <div
            class="table-down"
            v-if="seasonStat.ranking > seasonStat.previousRanking"
          >
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <table-down-icon />
                  -{{ seasonStat.ranking - seasonStat.previousRanking }}
                </span>
              </template>
              <span
                >Down
                {{ seasonStat.ranking - seasonStat.previousRanking }} positions
                from {{ seasonStat.previousRanking }}
              </span>
            </v-tooltip>
          </div>
          <div
            class="winner emphasised"
            v-if="
              seasonStat.ranking === 1 && finished(seasonStat.season.status)
            "
          >
            Winner
          </div>
        </div>
        <!-- Matches played -->
        <div class="matches-played stat after-main-item">
          {{ seasonStat.matchesPlayed }}
        </div>
        <!-- Matches won ----->
        <div class="matches-won stat">{{ seasonStat.matchesWon }}</div>
        <!-- Matches drawn --->
        <div class="matches-drawn stat">{{ seasonStat.matchesDrawn }}</div>
        <!-- Matches lost ---->
        <div class="matches-lost stat">{{ seasonStat.matchesLost }}</div>
        <!-- Goals for ------->
        <div class="goals-for stat">{{ seasonStat.goalsFor }}</div>
        <!-- Goals against --->
        <div class="goals-against stat">{{ seasonStat.goalsAgainst }}</div>
        <!-- Goal difference -->
        <div class="goal-difference stat">
          <template v-if="seasonStat.goalDifference > 0">+</template>
          {{ seasonStat.goalDifference }}
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
        <div class="points stat emphasised">{{ seasonStat.points }}</div>
      </template>
    </v-list-item-title>
  </list-container-item>
</template>

<script>
export default {
  name: "LeagueTableRow",
  props: {
    seasonStat: Object,
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
        return { name: "team", params: { id: this.seasonStat.team.id } };
      } else if (this.view === "d11Team") {
        return { name: "d11Team", params: { id: this.seasonStat.d11Team.id } };
      }
      return null;
    },
    formMatchPoints() {
      var formMatchPoints = [];
      this.seasonStat.formMatchPoints.forEach(function(item, index) {
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
