<template>
  <list-container-item
    class="player-season-stat-container"
    :to="{ name: 'player', params: { id: playerSeasonStat.player.id } }"
  >
    <v-list-item-title class="player-season-stat">
      <template v-if="smAndUp">
        <!-- Player image ---------------->
        <div class="image">
          <player-image
            :size="'tiny'"
            :fileName="playerSeasonStat.player.photoFileName"
          />
        </div>
        <!-- Player name ----------------->
        <div class="player">
          <template v-if="playerSeasonStat.player.name.length <= maxNameLength">
            {{ playerSeasonStat.player.name }}
          </template>
          <template v-else>{{ playerSeasonStat.player.shortName }}</template>
        </div>
        <!-- Ranking ----------------------->
        <div class="ranking after-main-item">
          {{ playerSeasonStat.ranking }}
        </div>
        <template v-if="this.participated(playerSeasonStat)">
          <!-- Appearances ----------------------->
          <div class="appearances">
            {{ playerSeasonStat.gamesStarted }}/{{
              playerSeasonStat.substitutionsOn
            }}
          </div>
          <!-- Goals ----------------------->
          <div class="goals">
            {{ playerSeasonStat.goals > 0 ? playerSeasonStat.goals : "&nbsp;" }}
          </div>

          <!-- Own goals ------------------->
          <div class="own-goals">
            {{
              playerSeasonStat.ownGoals > 0
                ? playerSeasonStat.ownGoals
                : "&nbsp;"
            }}
          </div>

          <!-- Assists --------------------->
          <div class="goal-assists">
            {{
              playerSeasonStat.goalAssists > 0
                ? playerSeasonStat.goalAssists
                : "&nbsp;"
            }}
          </div>

          <!-- Cards --------------------->
          <div class="cards">
            <template v-if="playerSeasonStat.yellowCards > 0">
              <yellow-card-icon />
              {{ playerSeasonStat.yellowCards }}
            </template>
            <template v-if="playerSeasonStat.redCards > 0">
              <red-card-icon />
              {{ playerSeasonStat.redCards }}
            </template>
          </div>

          <!-- MoMs ----------------------->
          <div class="man-of-the-match">
            <template
              v-if="
                playerSeasonStat.manOfTheMatch > 0 &&
                  playerSeasonStat.sharedManOfTheMatch <= 0
              "
            >
              {{ playerSeasonStat.manOfTheMatch }}
            </template>
            <template v-else-if="playerSeasonStat.sharedManOfTheMatch > 0">
              {{ playerSeasonStat.manOfTheMatch }}/{{
                playerSeasonStat.sharedManOfTheMatch
              }}
            </template>
            <template v-else>
              &nbsp;
            </template>
          </div>

          <!-- Rating --------------------->
          <div class="rating">
            {{ (playerSeasonStat.rating / 100).toFixed(2) }}
          </div>

          <!-- Form ------------>
          <div class="form" v-if="mdAndUp">
            <template v-if="this.participated(playerSeasonStat)">
              <form-match-point
                v-for="formMatchPoint in formMatchPoints"
                :key="formMatchPoint.index"
                :formMatchPoint="formMatchPoint"
              />
            </template>
          </div>
        </template>
        <template v-else>
          <!-- Did not participate --------->
          <div class="did-not-participate">
            {{
              this.finished(playerSeasonStat.season.status)
                ? "Did not participate"
                : "Has not participated"
            }}
          </div>
        </template>
      </template>

      <!-- Points --------------------->
      <div class="points">
        {{ playerSeasonStat.points }}
      </div>

      <!-- D11 Team -------------------->
      <div class="d11-team" v-if="['team'].includes(view)">
        <template v-if="!playerSeasonStat.d11Team.dummy && mdAndUp">
          {{ playerSeasonStat.d11Team.name }}
        </template>
        <template v-else-if="!playerSeasonStat.d11Team.dummy && smAndDown">
          {{ playerSeasonStat.d11Team.code }}
        </template>
        <template v-else>&nbsp;</template>
      </div>
    </v-list-item-title>
  </list-container-item>
</template>

<script>
export default {
  name: "PlayerSeasonStat",
  props: {
    playerSeasonStat: Object,
    view: String
  },
  components: {
    ListContainerItem: () => import("@/components/ListContainerItem"),
    PlayerImage: () => import("@/components/image/PlayerImage"),
    YellowCardIcon: () => import("@/components/match_event/YellowCardIcon"),
    RedCardIcon: () => import("@/components/match_event/RedCardIcon"),
    FormMatchPoint: () => import("@/components/FormMatchPoint")
  },
  methods: {
    participated: function(playerSeasonStat) {
      return (
        playerSeasonStat.gamesStarted > 0 ||
        playerSeasonStat.substitutionsOn > 0
      );
    }
  },
  computed: {
    maxNameLength() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return 100;
      }
      var maxNameLength = 22;
      if (["matchWeek"].includes(this.view)) {
        if (this.playerStat.lineup === 1) {
          maxNameLength -= 6;
        }
        if (
          this.playerStat.manOfTheMatch ||
          this.playerStat.sharedManOfTheMatch
        ) {
          maxNameLength -= 6;
        }
      }
      return maxNameLength;
    },
    formMatchPoints() {
      var formMatchPoints = [];
      this.playerSeasonStat.formMatchPoints.forEach(function(item, index) {
        formMatchPoints.push({ index: index, points: item });
      });
      return formMatchPoints;
    }
  }
};
</script>

<style lang="scss" scoped>
.player-season-stat-container {
  min-height: 48px;
  .player-season-stat > div {
    padding: 0 $d11-spacer;
  }

  .player-season-stat {
    .image {
      min-width: 44px;
    }
  }

  .did-not-participate {
    width: 33.8em;
    opacity: 0.6;
  }

  .ranking,
  .appearances,
  .goals,
  .own-goals,
  .goal-assists {
    width: 3em;
  }

  .cards {
    width: 4.5em;
  }

  .rating,
  .man-of-the-match,
  .points {
    width: 3.2em;
  }

  .form {
    min-width: 10.5em;
  }

  .points {
    width: 2.5em;
    text-align: right !important;
    font-weight: 600;
  }

  .team,
  .d11-team {
    padding-left: 6px;
    text-align: left !important;
    width: 15em;
  }
}

.v-application-md {
  .player-season-stat-container {
    .player-season-stat {
      .points {
        width: 2.4em;
      }
      .team,
      .d11-team {
        width: 9.8em;
      }
    }
  }
}

.v-application-sm {
  .player-season-stat-container {
    .player-season-stat {
      .points {
        width: 2.4em;
      }
      .team,
      .d11-team {
        width: 3.5em;
      }
    }
  }
}
</style>
