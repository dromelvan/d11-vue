<template>
  <list-container-item
    class="player-stat-container"
    :to="{ name: 'player', params: { id: playerStat.player.id } }"
    v-bind:class="{
      'man-of-the-match':
        playerStat.manOfTheMatch || playerStat.sharedManOfTheMatch
    }"
  >
    <v-list-item-title class="player-stat">
      <template v-if="smAndUp">
        <!-- Player image ---------------->
        <div class="image">
          <player-image
            :size="'tiny'"
            :fileName="playerStat.player.photoFileName"
          />
        </div>
        <!-- Player name ----------------->
        <div class="player">
          <template v-if="!pending(playerStat.match.status)">
            <span class="substitute" v-if="playerStat.lineup === 1">SUB </span>
            <span
              class="did-not-participate"
              v-else-if="playerStat.lineup === 0"
              >DNP
            </span>
          </template>
          <template v-if="mdAndUp || playerStat.player.name.length < 22">{{
            playerStat.player.name
          }}</template>
          <template v-else>{{ playerStat.player.shortName }}</template>
        </div>

        <!-- Man of the match ------------>
        <div
          class="man-of-the-match"
          v-if="playerStat.manOfTheMatch || playerStat.sharedManOfTheMatch"
        >
          <span v-if="mdAndUp">Man of the Match</span>
          <span v-if="smAndDown">MoM</span>
        </div>

        <!-- Elapsed --------------------->
        <div
          class="elapsed"
          v-if="
            ['d11Match'].includes(view) &&
              playerStat.lineup >= 1 &&
              active(playerStat.match.status)
          "
        >
          <v-progress-circular
            class="progress"
            :rotate="-90"
            :size="35"
            :width="5"
            :value="elapsed(playerStat.match.elapsed)"
            color="#061958"
          >
            {{ playerStat.match.elapsed }}
          </v-progress-circular>
        </div>

        <template v-if="['d11Match'].includes(view)">
          <!-- Team ------------------------>
          <div class="team after-main-item">
            <team-image :size="'icon'" :id="playerStat.team.id" />
          </div>

          <!-- Match ----------------------->
          <div class="match" v-if="['d11Match'].includes(view)">
            <team-image :size="'icon'" :id="2" />
            <template v-if="!pending(playerStat.match.status)">
              {{ playerStat.match.homeTeamGoals }}-{{
                playerStat.match.awayTeamGoals
              }}
            </template>
            <template v-else>
              vs
            </template>
            <team-image :size="'icon'" :id="4" />
          </div>
        </template>

        <template v-if="participated(playerStat)">
          <!-- Goals ----------------------->
          <div
            class="goals"
            :class="{ 'after-main-item': ['match'].includes(view) }"
          >
            <template v-if="playerStat.goals > 0">{{
              playerStat.goals
            }}</template
            ><template v-else>&nbsp;</template>
          </div>

          <!-- Own goals ------------------->
          <div class="own-goals">
            <template v-if="playerStat.ownGoals > 0">{{
              playerStat.ownGoals
            }}</template
            ><template v-else>&nbsp;</template>
          </div>

          <!-- Assists --------------------->
          <div class="goal-assists">
            <template v-if="playerStat.goalAssists > 0">{{
              playerStat.goalAssists
            }}</template
            ><template v-else>&nbsp;</template>
          </div>

          <!-- Goals conceded -------------->
          <div
            class="goals-conceded"
            v-if="['match'].includes(view) || mdAndUp"
          >
            <template v-if="playerStat.position.defender">{{
              playerStat.goalsConceded
            }}</template
            ><template v-else>&nbsp;</template>
          </div>

          <!-- Cards ----------------------->
          <div class="cards">
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
          <div class="substitutions">
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
          <div class="rating">
            <template v-if="playerStat.rating > 0">{{
              (playerStat.rating / 100).toFixed(2)
            }}</template
            ><template v-else>&nbsp;</template>
          </div>
        </template>

        <!-- Unused substitute ----------->
        <div
          class="unused-substitute"
          v-else-if="playerStat.lineup === 1"
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

        <!-- Points ---------------------->
        <div class="points">
          <template v-if="!pending(playerStat.match.status)">{{
            playerStat.points
          }}</template>
        </div>

        <!-- D11 Team -------------------->
        <div class="d11-team" v-if="['match'].includes(view)">
          <template v-if="!playerStat.d11Team.dummy && mdAndUp">{{
            playerStat.d11Team.name
          }}</template>
          <template v-else-if="!playerStat.d11Team.dummy && smAndDown">{{
            playerStat.d11Team.code
          }}</template>
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
    view: String
  },
  components: {
    ListContainerItem: () => import("@/components/ListContainerItem"),
    PlayerImage: () => import("@/components/image/PlayerImage"),
    TeamImage: () => import("@/components/image/TeamImage"),
    YellowCardIcon: () => import("@/components/match_event/YellowCardIcon"),
    RedCardIcon: () => import("@/components/match_event/RedCardIcon"),
    SubstitutionOnIcon: () =>
      import("@/components/match_event/SubstitutionOnIcon"),
    SubstitutionOffIcon: () =>
      import("@/components/match_event/SubstitutionOffIcon")
  },
  methods: {
    participated: function(playerStat) {
      return playerStat.lineup === 2 || playerStat.substitutionOnTime > 0;
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
    div.substitute {
      padding-right: $d11-spacer;
    }

    .substitute,
    .did-not-participate,
    .points {
      font-weight: 600;
    }

    .elapsed {
      .progress {
        font-size: 0.6em;
      }
    }

    .team {
      width: 3em;
    }
    .match {
      width: 4.5em;
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
      .d11-team {
        width: 9.8em;
      }
    }
  }
}

.v-application-sm {
  .player-stat-container {
    .player-stat {
      .points {
        width: 2.4em;
      }
      .d11-team {
        width: 3.5em;
      }
    }
  }
}

.v-application-xs {
  .list-container {
    .player-stat-container {
      padding: 0;
      .player-stat {
        .match-not-played,
        .did-not-participate,
        .unused-substitute {
          width: unset;
          text-align: right;
        }
        .points {
          width: 1.8em;
        }
      }
    }
  }
}
</style>
