<template>
  <list-container-item class="player-season-stat-container" :to="to">
    <v-list-item-title class="player-season-stat">
      <template>
        <!-- Season ---------------------->
        <div class="season" v-if="isView(['player'])">
          {{ playerSeasonStat.season.name }}
        </div>
        <!-- Team -------------------->
        <div class="team" v-if="isView(['player'])">
          <template v-if="!playerSeasonStat.team.dummy && mdAndUp">
            <team-image size="tiny" :id="playerSeasonStat.team.id" />
            {{ playerSeasonStat.team.name }}
          </template>
          <template v-else-if="!playerSeasonStat.team.dummy && smAndDown">
            {{ playerSeasonStat.team.code }}
          </template>
          <template v-else>&nbsp;</template>
        </div>
        <!-- Player image ---------------->
        <div
          class="image"
          v-if="isView(['team', 'd11Team', 'transferListing']) && smAndUp"
        >
          <player-image
            :size="'tiny'"
            :fileName="playerSeasonStat.player.photoFileName"
          />
        </div>
        <!-- Player name ----------------->
        <div
          class="player"
          v-if="isView(['team', 'd11Team', 'transferListing'])"
        >
          <template v-if="playerSeasonStat.player.name.length <= maxNameLength">
            {{ playerSeasonStat.player.name }}
          </template>
          <template v-else>{{ playerSeasonStat.player.shortName }}</template>
        </div>
        <!-- Ranking ----------------------->
        <div class="ranking after-main-item">
          {{ playerSeasonStat.ranking }}
        </div>
        <!-- Team -------------------------->
        <div class="team-image-container" v-if="isView(['transferListing'])">
          <team-image size="tiny" :id="playerSeasonStat.team.id" />
        </div>
        <!-- Fee --------------------------->
        <div class="fee" v-if="isView(['d11Team', 'player'])">
          <template v-if="playerSeasonStat.value > 0">
            {{ playerValue(playerSeasonStat.value) }}
          </template>
          <template v-else>
            &nbsp;
          </template>
        </div>
        <template v-if="this.participated(playerSeasonStat)">
          <!-- Appearances ----------------------->
          <div class="appearances" v-if="smAndUp">
            {{ playerSeasonStat.gamesStarted }}/{{
              playerSeasonStat.substitutionsOn
            }}
          </div>
          <!-- Goals ----------------------->
          <div class="goals" v-if="smAndUp">
            {{ playerSeasonStat.goals > 0 ? playerSeasonStat.goals : "&nbsp;" }}
          </div>

          <!-- Own goals ------------------->
          <div class="own-goals" v-if="smAndUp">
            {{
              playerSeasonStat.ownGoals > 0
                ? playerSeasonStat.ownGoals
                : "&nbsp;"
            }}
          </div>

          <!-- Assists --------------------->
          <div class="goal-assists" v-if="smAndUp">
            {{
              playerSeasonStat.goalAssists > 0
                ? playerSeasonStat.goalAssists
                : "&nbsp;"
            }}
          </div>

          <!-- Cards --------------------->
          <div class="cards" v-if="smAndUp">
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
          <div class="man-of-the-match" v-if="smAndUp">
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
          <div class="rating" v-if="smAndUp">
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
          <div class="did-not-participate" v-if="smAndUp">
            {{
              playerSeasonStat.season &&
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
      <div
        class="d11-team"
        v-if="isView(['team', 'player', 'transferListing'])"
      >
        <template v-if="!playerSeasonStat.d11Team.dummy && mdAndUp">
          <d11-team-image size="tiny" :id="playerSeasonStat.d11Team.id" />
          {{ playerSeasonStat.d11Team.name }}
        </template>
        <template v-else-if="!playerSeasonStat.d11Team.dummy && smAndDown">
          {{ playerSeasonStat.d11Team.code }}
        </template>
        <template v-else>&nbsp;</template>
      </div>
      <!-- Team -------------------->
      <div class="team" v-if="isView(['d11Team'])">
        <template v-if="!playerSeasonStat.team.dummy && mdAndUp">
          <team-image size="tiny" :id="playerSeasonStat.team.id" />
          {{ playerSeasonStat.team.name }}
        </template>
        <template v-else-if="!playerSeasonStat.team.dummy && smAndDown">
          {{ playerSeasonStat.team.code }}
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
    FormMatchPoint: () => import("@/components/FormMatchPoint"),
    TeamImage: () => import("@/components/image/TeamImage"),
    D11TeamImage: () => import("@/components/image/D11TeamImage")
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
      if (this.$vuetify.breakpoint.lgAndUp) {
        return 100;
      } else if (this.$vuetify.breakpoint.xs) {
        return 20;
      }
      return 22;
    },
    formMatchPoints() {
      var formMatchPoints = [];
      this.playerSeasonStat.formMatchPoints.forEach(function(item, index) {
        formMatchPoints.push({ index: index, points: item });
      });
      return formMatchPoints;
    },
    to() {
      if (this.view === "transferListing") {
        return {
          name: "player",
          params: {
            id: this.playerSeasonStat.player.id,
            seasonId: this.currentSeason().id,
            parentLink: this.parentLink
          }
        };
      }
      return {
        name: "player",
        params: {
          id: this.playerSeasonStat.player.id,
          seasonId: this.playerSeasonStat.season.id,
          parentLink: this.parentLink
        }
      };
    },
    parentLink() {
      if (this.view === "team") {
        return {
          text: this.smAndUp
            ? this.playerSeasonStat.team.name
            : this.playerSeasonStat.team.shortName,
          name: "team",
          params: { id: this.playerSeasonStat.team.id }
        };
      }
      return null;
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

  .season {
    text-align: left !important;
    min-width: 5em;
  }

  .fee {
    text-align: right !important;
    min-width: 2.3em;
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
    min-width: 11em;
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

  .team-image-container {
    min-width: 2.6em;
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
      .did-not-participate {
        width: 22.9em;
      }
    }
  }
}

.v-application-xs {
  .d11-team {
    .player {
      padding-left: 0px !important;
    }
  }
  .player {
    margin-right: auto !important;
  }
  .d11-team {
    width: 3.5em;
  }
  .team {
    width: 3.5em;
  }
  .v-list-item {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}
</style>
