<template>
  <v-lazy
    v-model="visible"
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
  >
    <list-container-item
      v-if="matchWeek"
      class="match-week-container"
      :to="{ name: 'matchWeek', params: { id: matchWeek.id } }"
    >
      <v-list-item-title class="match-week">
        <template v-if="smAndUp">
          <!-- Date --------------------->
          <div class="date">
            <template v-if="smAndDown">
              {{ matchWeek.date | moment("DD.MM.YY") }}
            </template>
            <template v-else>
              {{ matchWeek.date | moment("DD.MM YYYY") }}
            </template>
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
          <div class="most-valuable-player main-item">
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
          <!-- Premier League leader ------------>
          <div class="image" v-if="!pending(matchWeek.status)">
            <team-image
              :type="'team'"
              :size="'tiny'"
              :id="matchWeek.premierLeagueLeader.team.id"
            />
          </div>
          <div class="premier-league-leader">
            <template v-if="!pending(matchWeek.status)">
              <template v-if="smAndDown">
                {{ matchWeek.premierLeagueLeader.team.code }}
              </template>
              <template v-else>
                {{ matchWeek.premierLeagueLeader.team.name }}
              </template>
              <span class="points">
                {{ matchWeek.premierLeagueLeader.points }} pts
              </span>
            </template>
          </div>
          <!-- D11 leader ------------>
          <div class="image" v-if="!pending(matchWeek.status)">
            <d11-team-image
              :type="'d11Team'"
              :size="'tiny'"
              :id="matchWeek.d11LeagueLeader.d11Team.id"
            />
          </div>
          <div class="d11-league-leader">
            <template v-if="!pending(matchWeek.status)">
              <template v-if="smAndDown">
                {{ matchWeek.d11LeagueLeader.d11Team.code }}
              </template>
              <template v-else>
                {{ matchWeek.d11LeagueLeader.d11Team.name }}
              </template>
              <span class="points">
                {{ matchWeek.d11LeagueLeader.points }} pts
              </span>
            </template>
          </div>
          <!-- Status ------------------->
          <div class="status">
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
  </v-lazy>
</template>

<script>
export default {
  name: "LazyMatchWeek",
  props: {
    view: String,
    matchWeekId: Number
  },
  data: () => ({
    visible: false,
    matchWeek: null
  }),
  components: {
    ListContainerItem: () => import("@/components/ListContainerItem"),
    TeamImage: () => import("@/components/image/TeamImage"),
    D11TeamImage: () => import("@/components/image/D11TeamImage")
  },
  watch: {
    visible: function() {
      new this.$d11BootApi.MatchWeekApi()
        .findMatchWeekById(this.matchWeekId)
        .then(result => (this.matchWeek = result));
    }
  }
};
</script>

<style lang="scss" scoped>
.v-lazy {
  min-height: 48px;
}
.date {
  min-width: 5.2rem;
}
.list-container .v-list-item__content .v-list-item__title > * {
  text-align: left;
}
.match-week-number {
  min-width: 6.8rem;
}
.points {
  font-weight: 600;
  width: 100%;
  vertical-align: right;
}
.image {
  padding-right: $d11-spacer;
}

.premier-league-leader {
  min-width: 200px;
}

.d11-league-leader {
  min-width: 150px;
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
  .date {
    min-width: 3.5rem;
  }
  .premier-league-leader,
  .d11-league-leader {
    min-width: 5.5rem;
  }
  .status {
    min-width: 3.4rem;
  }
}
</style>
