<template>
  <list-container columns class="match-week-list">
    <template v-slot:header>
      <div class="list-container-header">
        <div class="date">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Date</span>
            </template>
            <span>The date the match week starts</span>
          </v-tooltip>
        </div>
        <div class="match-week-number">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                <template v-if="smAndDown">
                  #
                </template>
                <template v-else>
                  Match Week
                </template>
              </span>
            </template>
            <span>Name of the match week</span>
          </v-tooltip>
        </div>
        <div class="most-valuable-player main-item">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Most Valuable Player</span>
            </template>
            <span>
              The player who scored the most points this match week
            </span>
          </v-tooltip>
        </div>
        <div class="premier-league-leader">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                <template v-if="smAndDown">
                  PL Leader
                </template>
                <template v-else>
                  Premier League Leader
                </template>
              </span>
            </template>
            <span>
              The team at the top of the Premier League table after this match
              week
            </span>
          </v-tooltip>
        </div>
        <div class="d11-league-leader">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">D11 Leader</span>
            </template>
            <span>
              The D11 team at the top of the D11 league table after this match
              week
            </span>
          </v-tooltip>
        </div>
        <div class="status">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Status</span>
            </template>
            <span>
              Status of the match week
            </span>
          </v-tooltip>
        </div>
      </div>
    </template>
    <div v-for="matchWeekId in matchWeekIds" :key="matchWeekId">
      <lazy-match-week :matchWeekId="matchWeekId" :view="view" />
      <v-divider />
    </div>
  </list-container>
</template>

<script>
export default {
  name: "LazyMatchWeekList",
  props: {
    view: String,
    matchWeekIds: Array
  },
  components: {
    ListContainer: () => import("@/components/ListContainer"),
    LazyMatchWeek: () => import("./LazyMatchWeek")
  }
};
</script>

<style lang="scss" scoped>
.date {
  min-width: 5.2rem;
}
.list-container .list-container-header > * {
  text-align: left;
}
.match-week-number {
  min-width: 6.8rem;
}
.list-container-header {
  .most-valuable-player {
    min-width: calc(50% - 11rem + 38px);
  }
}

.premier-league-leader {
  min-width: calc(200px + 38px);
}

.d11-league-leader {
  min-width: calc(150px + 38px);
}

.status {
  min-width: 4rem;
  text-align: right !important;
}

.v-application-xs,
.v-application-sm {
  .match-week-number {
    text-align: center !important;
    min-width: 2.5rem;
  }
  .date {
    min-width: 3.5rem;
  }
  .premier-league-leader,
  .d11-league-leader {
    min-width: calc(5.5rem + 38px);
  }
  .status {
    min-width: 3.4rem;
  }
}
</style>
