<template>
  <list-container-item
    class="player-stat-container"
    :to="to"
    v-bind:class="{
      'man-of-the-match':
        playerStat.manOfTheMatch || playerStat.sharedManOfTheMatch
    }"
  >
    <v-list-item-title class="player-stat">
      <template>
        <!-- Match date ------------------>
        <div class="match-date" v-if="['player'].includes(view)">
          <template v-if="!this.postponed(playerStat.match.status)">
            <template v-if="mdAndUp">
              {{ playerStat.match.datetime | moment("DD.MM YYYY") }}
            </template>
            <template v-else>
              {{ playerStat.match.datetime | moment("DD.MM") }}
            </template>
          </template>
          <template v-else-if="mdAndUp">
            Postponed
          </template>
          <template v-else>
            PP
          </template>
        </div>
        <!-- Kickoff ----------------->
        <div class="kickoff" v-if="['player'].includes(view) && smAndUp">
          <template
            v-if="
              !this.postponed(playerStat.match.status) &&
                ['player'].includes(view)
            "
          >
            {{ playerStat.match.datetime | moment("HH:mm") }}
          </template>
        </div>
        <!-- Match week ------------------>
        <div class="match-week" v-if="['player'].includes(view)">
          {{ playerStat.match.matchWeek.matchWeekNumber }}
        </div>
        <!-- Player image ---------------->
        <div
          class="image"
          v-if="['match', 'd11Match'].includes(view) && smAndUp"
        >
          <player-image
            :size="'tiny'"
            :fileName="playerStat.player.photoFileName"
          />
        </div>
        <!-- Player name ----------------->
        <div class="player" v-if="['match', 'd11Match'].includes(view)">
          <template v-if="!pending(playerStat.match.status)">
            <span class="substitute" v-if="playerStat.lineup === 1">SUB </span>
            <span
              class="did-not-participate"
              v-else-if="playerStat.lineup === 0"
            >
              DNP
            </span>
          </template>
          <template v-if="playerStat.player.name.length <= maxNameLength">
            {{ playerStat.player.name }}
          </template>
          <template v-else>{{ playerStat.player.shortName }}</template>
        </div>

        <!-- Man of the match ------------>
        <div
          class="man-of-the-match"
          v-if="
            ['match', 'd11Match', 'player'].includes(view) &&
              (playerStat.manOfTheMatch || playerStat.sharedManOfTheMatch) &&
              smAndUp
          "
        >
          <span v-if="mdAndUp">Man of the Match</span>
          <span v-if="smAndDown">MoM</span>
        </div>

        <!-- Elapsed --------------------->
        <div
          class="elapsed"
          v-if="
            ['d11Match', 'player'].includes(view) &&
              playerStat.lineup >= 1 &&
              active(playerStat.match.status) &&
              smAndUp
          "
        >
          <elapsed :elapsedTime="playerStat.match.elapsed" />
        </div>

        <template v-if="['d11Match', 'matchWeek', 'player'].includes(view)">
          <!-- Match ----------------------->
          <div
            class="match after-main-item"
            v-if="['d11Match', 'matchWeek', 'player'].includes(view)"
          >
            <team-image :size="'icon'" :id="playerStat.match.homeTeam.id" />
            <template v-if="!pending(playerStat.match.status)">
              {{ playerStat.match.homeTeamGoals }}-{{
                playerStat.match.awayTeamGoals
              }}
            </template>
            <template v-else>
              vs
            </template>
            <team-image :size="'icon'" :id="playerStat.match.awayTeam.id" />
          </div>
        </template>
        <!-- Team -------------------------->
        <div class="player-team" v-if="['player'].includes(view)">
          <team-image :size="'icon'" :id="playerStat.team.id" />
        </div>
        <template v-if="participated(playerStat)">
          <!-- Goals ----------------------->
          <div
            class="goals"
            :class="{
              'after-main-item': ['match'].includes(view)
            }"
            v-if="smAndUp"
          >
            <template v-if="playerStat.goals > 0 && smAndUp">{{
              playerStat.goals
            }}</template
            ><template v-else>&nbsp;</template>
          </div>

          <!-- Own goals ------------------->
          <div class="own-goals" v-if="smAndUp">
            <template v-if="playerStat.ownGoals > 0">{{
              playerStat.ownGoals
            }}</template
            ><template v-else>&nbsp;</template>
          </div>

          <!-- Assists --------------------->
          <div class="goal-assists" v-if="smAndUp">
            <template v-if="playerStat.goalAssists > 0">{{
              playerStat.goalAssists
            }}</template
            ><template v-else>&nbsp;</template>
          </div>

          <!-- Goals conceded -------------->
          <div
            class="goals-conceded"
            v-if="(['match'].includes(view) && smAndUp) || mdAndUp"
          >
            <template v-if="playerStat.position.defender">{{
              playerStat.goalsConceded
            }}</template
            ><template v-else>&nbsp;</template>
          </div>

          <!-- Cards ----------------------->
          <div class="cards" v-if="smAndUp">
            <yellow-card-icon v-if="playerStat.yellowCardTime > 0" />
            <template v-if="playerStat.yellowCardTime > 0"
              >{{ playerStat.yellowCardTime }}'</template
            >
            <br
              v-if="playerStat.yellowCardTime > 0 && playerStat.redCardTime > 0"
            />
            <red-card-icon v-if="playerStat.redCardTime > 0" />
            <template v-if="playerStat.redCardTime > 0"
              >{{ playerStat.redCardTime }}'</template
            >
          </div>

          <!-- Substitutions --------------->
          <div class="substitutions" v-if="smAndUp">
            <substitution-on-icon v-if="playerStat.substitutionOnTime > 0" />
            <template v-if="playerStat.substitutionOnTime > 0">
              {{ playerStat.substitutionOnTime }}'
            </template>
            <br
              v-if="
                playerStat.substitutionOnTime > 0 &&
                  playerStat.substitutionOffTime > 0
              "
            />
            <substitution-off-icon v-if="playerStat.substitutionOffTime > 0" />
            <template v-if="playerStat.substitutionOffTime > 0">
              {{ playerStat.substitutionOffTime }}'
            </template>
          </div>

          <!-- Rating ---------------------->
          <div class="rating" v-if="smAndUp || isView(['match'])">
            <template v-if="playerStat.rating > 0">{{
              (playerStat.rating / 100).toFixed(2)
            }}</template
            ><template v-else>&nbsp;</template>
          </div>
        </template>

        <template v-else-if="smAndUp">
          <!-- Unused substitute ----------->
          <div
            class="unused-substitute"
            v-if="playerStat.lineup === 1"
            :class="{
              'after-main-item': ['match'].includes(view),
              narrow: smAndDown && ['d11Match'].includes(view)
            }"
          >
            Unused Substitute
          </div>

          <!-- Match not played ------------>
          <div
            class="match-not-played"
            v-else-if="pending(playerStat.match.status)"
            :class="{
              'after-main-item': ['match'].includes(view),
              narrow: smAndDown && ['d11Match'].includes(view)
            }"
          >
            Kickoff
            {{ playerStat.match.datetime | moment("DD.MM YYYY [at] HH:mm") }}
          </div>

          <!-- Did not participate --------->
          <div
            class="did-not-participate"
            v-else
            :class="{
              'after-main-item': ['match'].includes(view),
              narrow: smAndDown && ['d11Match'].includes(view)
            }"
          >
            Did not participate
          </div>
        </template>

        <!-- Points ---------------------->
        <div class="points">
          <template v-if="!pending(playerStat.match.status)">
            <template v-if="smAndUp || participated(playerStat)">
              {{ playerStat.points }}
            </template>
            <template v-else> ({{ playerStat.points }}) </template>
          </template>
        </div>

        <!-- Team ------------------------>
        <div class="team" v-if="['d11Match'].includes(view)">
          <template v-if="mdAndUp">
            <team-image :size="'icon'" :id="playerStat.team.id" />
            {{ playerStat.team.name }}
          </template>
          <template v-else>
            {{ playerStat.team.code }}
          </template>
        </div>

        <!-- D11 Team -------------------->
        <div
          class="d11-team"
          v-if="['match', 'matchWeek', 'player'].includes(view)"
        >
          <template v-if="!playerStat.d11Team.dummy && mdAndUp">
            <d11-team-image size="tiny" :id="playerStat.d11Team.id" />
            {{ playerStat.d11Team.name }}
          </template>
          <template v-else-if="!playerStat.d11Team.dummy && smAndDown">
            <d11-team-image
              size="tiny"
              :id="playerStat.d11Team.id"
              v-if="isView(['player']) && xs"
            />
            {{ playerStat.d11Team.code }}
          </template>
          <template v-else>&nbsp;</template>
        </div>
      </template>
    </v-list-item-title>
  </list-container-item>
</template>

<script>
export default {
  name: "PlayerStat",
  props: {
    playerStat: Object,
    d11Match: Object,
    view: String
  },
  components: {
    ListContainerItem: () => import("@/components/ListContainerItem"),
    PlayerImage: () => import("@/components/image/PlayerImage"),
    TeamImage: () => import("@/components/image/TeamImage"),
    Elapsed: () => import("@/components/Elapsed"),
    YellowCardIcon: () => import("@/components/match_event/YellowCardIcon"),
    RedCardIcon: () => import("@/components/match_event/RedCardIcon"),
    SubstitutionOnIcon: () =>
      import("@/components/match_event/SubstitutionOnIcon"),
    SubstitutionOffIcon: () =>
      import("@/components/match_event/SubstitutionOffIcon"),
    D11TeamImage: () => import("@/components/image/D11TeamImage")
  },
  methods: {
    participated: function(playerStat) {
      return playerStat.lineup === 2 || playerStat.substitutionOnTime > 0;
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
    to() {
      if (this.view === "match") {
        return {
          name: "player",
          params: {
            id: this.playerStat.player.id,
            seasonId: this.playerStat.match.matchWeek.season.id,
            parentLink: this.parentLink
          }
        };
      } else if (this.view === "player") {
        return {
          name: "match",
          params: {
            id: this.playerStat.match.id,
            parentLink: this.parentLink
          }
        };
      }
      return null;
    },
    parentLink() {
      if (this.view === "match") {
        let homeTeam = this.playerStat.match.homeTeam;
        let awayTeam = this.playerStat.match.awayTeam;
        return {
          text: this.smAndUp
            ? homeTeam.shortName + " vs " + awayTeam.shortName
            : homeTeam.code + " vs " + awayTeam.code,
          name: "match",
          params: { id: this.playerStat.match.id }
        };
      } else if (this.view === "d11Match") {
        return {
          text: this.smAndUp
            ? this.d11Match.homeD11Team.name +
              " vs " +
              this.d11Match.awayD11Team.name
            : this.d11Match.homeD11Team.code +
              " vs " +
              this.d11Match.awayD11Team.code,
          name: "d11Match",
          params: { id: this.d11Match.id }
        };
      }
      return null;
    }
  }
};
</script>

<style lang="scss" scoped>
.player-stat-container {
  .player-stat > div {
    padding: 0 $d11-spacer;
  }

  .player-stat {
    .match-date {
      min-width: 5.8em;
      text-align: left !important;
    }

    .kickoff {
      min-width: 3.8em;
    }

    .match-week {
      min-width: 2.5em;
      text-align: center;
    }

    .image {
      min-width: 44px;
    }

    div.substitute {
      padding-right: $d11-spacer;
    }

    .substitute,
    span.did-not-participate,
    .points {
      font-weight: 600;
    }

    .elapsed {
      .progress {
        font-size: 0.6em;
      }
    }

    .match {
      min-width: 4.5em;
    }

    .player-team {
      min-width: 2.5em;
    }

    .goals,
    .own-goals,
    .goal-assists,
    .goals-conceded {
      width: 3em;
    }

    .cards,
    .substitutions {
      width: 3.5em;
    }

    div.unused-substitute,
    div.match-not-played,
    div.did-not-participate {
      width: 22.4em;
      opacity: 0.6;
    }

    div.unused-substitute.narrow,
    div.match-not-played.narrow,
    div.did-not-participate.narrow {
      width: 19.4em;
    }

    .rating,
    .points {
      text-align: right;
      width: 3.4em;
    }

    .team,
    .d11-team {
      text-align: left;
      width: 15em;
    }
  }
}

.player-stat-container.man-of-the-match {
  background-color: var(--v-primary-base);
  .man-of-the-match {
    font-weight: 600;
  }

  .v-list-item__content {
    .player-stat {
      color: white;
    }

    .elapsed {
      .progress {
        color: white !important;
      }
    }
  }
}

.v-application-md {
  .player-stat-container {
    .player-stat {
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
  .player-stat-container {
    .player-stat {
      .match-date {
        min-width: 3em;
      }
      .points {
        width: 2.4em;
      }
      .team,
      .d11-team {
        width: 3.5em;
      }
      .match-not-played,
      .did-not-participate,
      .unused-substitute {
        width: 19.4em;
      }
    }
  }
}

.v-application-xs {
  .list-container {
    .player-stat-container {
      padding: 0;
      .player-stat {
        .match-date {
          min-width: 3em;
        }
        .match-week {
          min-width: 2.2em !important;
        }

        .match-not-played,
        .did-not-participate,
        .unused-substitute {
          width: unset;
          text-align: right;
        }
        .player {
          padding: 0px;
          margin-right: auto;
        }

        .points {
          width: unset;
          min-width: 2.2em;
        }

        .d11-team {
          width: unset;
          min-width: 3em;
        }
      }
    }
  }

  .player {
    .list-container {
      .player-stat-container {
        .player-stat {
          .points {
            min-width: 2em;
          }

          .d11-team {
            width: unset;
            min-width: 4.6em;
          }
        }
      }
    }
  }
}
</style>
