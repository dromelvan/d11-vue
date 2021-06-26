<template>
  <div class="list-container-header">
    <!-- XS device header --------------------------------------------------->

    <template v-if="xs">
      <div class="position main-item">{{ context }}</div>
      <div class="points">P.</div>
    </template>

    <!-- Sm and up device header -------------------------------------------->

    <template v-if="smAndUp">
      <!-- Position ------------------>
      <div v-if="context" class="context">{{ context }}</div>
      <!-- Match date ---------------->
      <div class="match-date" v-if="['player'].includes(view)">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Date</span>
          </template>
          <span>The date of the match</span>
        </v-tooltip>
      </div>
      <!-- Kickoff time -------------->
      <div class="kickoff" v-if="['player'].includes(view)">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Kickoff</span>
          </template>
          <span>The time the match kicks off</span>
        </v-tooltip>
      </div>
      <!-- Match week -------------->
      <div class="match-week" v-if="['player'].includes(view)">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">MW</span>
          </template>
          <span>The match week the match belongs to</span>
        </v-tooltip>
      </div>
      <template v-if="['d11Match', 'matchWeek', 'player'].includes(view)">
        <!-- Match ------------------->
        <div class="match after-main-item">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Match</span>
            </template>
            <span>The match the player played for this match week</span>
          </v-tooltip>
        </div>
      </template>
      <!-- Team ------------------->
      <div class="player-team">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Team</span>
          </template>
          <span>The team the player played for this match</span>
        </v-tooltip>
      </div>
      <!-- Goals --------------------->
      <div
        class="goals"
        :class="{ 'after-main-item': ['match'].includes(view) }"
      >
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Goals</span>
          </template>
          <span>Goals scored</span>
        </v-tooltip>
      </div>
      <!-- Own goals ----------------->
      <div class="own-goals">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">OGs</span>
          </template>
          <span>Own goals scored</span>
        </v-tooltip>
      </div>
      <!-- Goal assists -------------->
      <div class="goal-assists">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Ass.</span>
          </template>
          <span>Goal assists</span>
        </v-tooltip>
      </div>
      <!-- Goals conceded ------------>
      <div class="goals-conceded" v-if="['match'].includes(view) || mdAndUp">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Con.</span>
          </template>
          <span>Goals conceded (defenders only)</span>
        </v-tooltip>
      </div>
      <!-- Cards --------------------->
      <div class="cards">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Cards</span>
          </template>
          <span>Yellow and red cards</span>
        </v-tooltip>
      </div>
      <!-- Substitutions ------------->
      <div class="substitutions">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Subs</span>
          </template>
          <span>Substitutions on and/or off</span>
        </v-tooltip>
      </div>
      <!-- Rating -------------------->
      <div class="rating">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Rating</span>
          </template>
          <span>WhoScored player rating</span>
        </v-tooltip>
      </div>
      <!-- Points -------------------->
      <div class="points">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on" v-if="lgAndUp">Points</span>
            <span v-bind="attrs" v-on="on" v-else>Pts</span>
          </template>
          <span>D11 points scored</span>
        </v-tooltip>
      </div>
      <!-- Team -------------------->
      <div class="team" v-if="['d11Match'].includes(view)">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Team</span>
          </template>
          <span>The team the player played for this match week</span>
        </v-tooltip>
      </div>
      <!-- D11 team ------------------>
      <div
        class="d11-team"
        v-if="['match', 'matchWeek', 'player'].includes(view)"
      >
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on" v-if="mdAndUp">D11 Team</span>
            <span v-bind="attrs" v-on="on" v-else>D11</span>
          </template>
          <span>Player D11 team for this match</span>
        </v-tooltip>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "PlayerStatsHeader",
  props: {
    context: String,
    view: String
  }
};
</script>

<style lang="scss" scoped>
.list-container-header {
  .match-date {
    padding-left: $d11-spacer;
    min-width: 5.8em;
    text-align: left !important;
  }

  .match {
    min-width: 4.5em;
  }

  .player-team {
    min-width: 2.5em;
  }

  .kickoff {
    min-width: 3.8em;
  }

  .match-week {
    min-width: 2.5em;
    text-align: center;
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
    padding-left: 6px;
    text-align: left;
    width: 15em;
  }
}

.v-application-md {
  .list-container-header {
    .points {
      width: 2.4em;
    }
    .team,
    .d11-team {
      width: 9.8em;
    }
  }
}

.v-application-sm {
  .list-container-header {
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
  }
}
</style>
