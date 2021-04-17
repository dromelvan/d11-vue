<template>
  <v-lazy
    v-model="visible"
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
  >
    <loading-indicator v-if="!matchWeeks" class="centered" />

    <list-container v-else columns class="match-week-list">
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
          <div class="most-valuable-player">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">Most Valuable Player</span>
              </template>
              <span>
                The player who scored the most points this match week
              </span>
            </v-tooltip>
          </div>
          <div class="league-leader">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">League Leader</span>
              </template>
              <span>
                The team at the top of the table after this match week
              </span>
            </v-tooltip>
          </div>
          <div class="status after-main-item">
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
      <div v-for="matchWeek in matchWeeks" :key="matchWeek.id">
        <list-container-item
          class="match-week-container"
          :to="{ name: 'matchWeek', params: { id: matchWeek.id } }"
        >
          <v-list-item-title class="match-week">
            <template v-if="smAndUp">
              <!-- Date --------------------->
              <div class="date">
                {{ matchWeek.date | moment("DD.MM YYYY") }}
              </div>
              <!-- Match Week --------------->
              <div class="match-week-number">
                <template v-if="mdAndUp">
                  Match Week
                </template>
                {{ matchWeek.matchWeekNumber }}
              </div>
              <div class="image" v-if="!pending(matchWeek.status)">
                <team-image
                  :type="'team'"
                  :size="'tiny'"
                  :id="matchWeek.mostValuablePlayer.team.id"
                />
              </div>
              <!-- Most valuable player ---->
              <div class="most-valuable-player">
                <template v-if="!pending(matchWeek.status)">
                  {{ matchWeek.mostValuablePlayer.player.name }}
                  <template v-if="matchWeek.mostValuablePlayer.d11Team.id > 1">
                    <template v-if="smAndDown">
                      ({{ matchWeek.mostValuablePlayer.d11Team.code }})
                    </template>
                    <template v-else>
                      ({{ matchWeek.mostValuablePlayer.d11Team.name }})
                    </template>
                  </template>
                  <span class="points">
                    {{ matchWeek.mostValuablePlayer.points }} pts
                  </span>
                </template>
              </div>
              <!-- League leader ------------>
              <div class="image" v-if="!pending(matchWeek.status)">
                <team-image
                  :type="'team'"
                  :size="'tiny'"
                  :id="matchWeek.leagueLeader.id"
                />
              </div>
              <div class="league-leader">
                <template v-if="!pending(matchWeek.status)">
                  {{ matchWeek.leagueLeader.name }}
                </template>
              </div>
              <!-- Status ------------------->
              <div class="status after-main-item">
                <template v-if="finished(matchWeek.status)">
                  Finished
                </template>
                <template v-else-if="matchWeek.elapsed > 0">
                  <v-progress-circular
                    class="progress"
                    :rotate="-90"
                    :size="35"
                    :width="5"
                    :value="matchWeek.elapsed * 10"
                    color="brand"
                  >
                    {{ matchWeek.elapsed }}
                  </v-progress-circular>
                </template>
              </div>
            </template>
          </v-list-item-title>
        </list-container-item>
        <v-divider />
      </div>
    </list-container>
  </v-lazy>
</template>

<script>
export default {
  name: "LazyMatchWeekList",
  props: {
    view: String,
    matchWeeks: Array
  },
  data: () => ({
    visible: false
  }),
  components: {
    LoadingIndicator: () => import("@/components/LoadingIndicator"),
    ListContainer: () => import("@/components/ListContainer"),
    ListContainerItem: () => import("@/components/ListContainerItem"),
    TeamImage: () => import("@/components/image/TeamImage")
  },
  watch: {
    visible: function() {
      this.$emit("visible");
    }
  }
};
</script>

<style lang="scss" scoped>
.v-lazy {
  min-height: 300px;
}
.date {
  min-width: 5.2rem;
}
.list-container .list-container-header > *,
.list-container .v-list-item__content .v-list-item__title > * {
  text-align: left;
}
.match-week-number {
  min-width: 6.8rem;
}
.points {
  font-weight: 600;
}
.image {
  padding-right: $d11-spacer;
}
.list-container-header {
  .most-valuable-player {
    min-width: calc(50% - 11rem + 38px);
  }
}
.most-valuable-player {
  min-width: calc(50% - 11rem);
}

.v-progress-circular {
  font-weight: 600;
  font-size: 0.9rem;
  margin-right: $d11-spacer;
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
  .list-container-header {
    .most-valuable-player {
      min-width: calc(50% - 4rem + 38px);
    }
  }
  .most-valuable-player {
    min-width: calc(50% - 4rem);
  }
}
</style>
