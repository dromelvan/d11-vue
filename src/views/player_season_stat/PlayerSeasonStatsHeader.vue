<template>
  <div class="list-container-header">
    <!-- Sm and up device header -------------------------------------------->
    <template>
      <!-- Position ------------------>
      <div v-if="context" class="context">{{ context }}</div>
      <!-- Season ------------------->
      <div class="season" v-if="isView('player')">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Season</span>
          </template>
          <span>
            A season the player participated in
          </span>
        </v-tooltip>
      </div>
      <!-- Team ------------------>
      <div class="team" v-if="isView('player')">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Team</span>
          </template>
          <span>Team the player belongs to</span>
        </v-tooltip>
      </div>
      <!-- Ranking ------------------->
      <div class="ranking after-main-item">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">#</span>
          </template>
          <span>
            The position of the player in the player season stats list
          </span>
        </v-tooltip>
      </div>
      <!-- Team ------------------->
      <div class="team-image-container" v-if="isView(['transferListing'])">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Team</span>
          </template>
          <span>Team the player belongs to</span>
        </v-tooltip>
      </div>
      <!-- Value ------------------->
      <div class="fee" v-if="isView(['d11Team', 'player'])">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Fee</span>
          </template>
          <span>
            The fee payed for the player by the D11 team
          </span>
        </v-tooltip>
      </div>
      <!-- Appearances ------------------->
      <div class="appearances" v-if="smAndUp">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Apps</span>
          </template>
          <span>
            Number of games started/coming on as a substitute
          </span>
        </v-tooltip>
      </div>
      <!-- Goals --------------------->
      <div class="goals" v-if="smAndUp">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Goals</span>
          </template>
          <span>Goals scored</span>
        </v-tooltip>
      </div>
      <!-- Own goals ----------------->
      <div class="own-goals" v-if="smAndUp">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">OGs</span>
          </template>
          <span>Own goals scored</span>
        </v-tooltip>
      </div>
      <!-- Goal assists -------------->
      <div class="goal-assists" v-if="smAndUp">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Ass.</span>
          </template>
          <span>Goal assists</span>
        </v-tooltip>
      </div>
      <!-- Cards --------------------->
      <div class="cards" v-if="smAndUp">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Cards</span>
          </template>
          <span>Yellow and red cards recieved</span>
        </v-tooltip>
      </div>
      <!-- MoM ---------------------->
      <div class="man-of-the-match" v-if="smAndUp">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">MoM</span>
          </template>
          <span>Full and shared man of the match awards</span>
        </v-tooltip>
      </div>
      <!-- Rating ------------------->
      <div class="rating" v-if="smAndUp">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Rating</span>
          </template>
          <span>Average rating</span>
        </v-tooltip>
      </div>
    </template>

    <!-- Form ----------------->
    <div class="form" v-if="mdAndUp">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">Form</span>
        </template>
        <span>Points over the last five games</span>
      </v-tooltip>
    </div>

    <!-- Points ------------------->
    <div class="points">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">Pts</span>
        </template>
        <span>Points</span>
      </v-tooltip>
    </div>

    <!-- D11 team ------------------>
    <div class="d11-team" v-if="isView(['team', 'player', 'transferListing'])">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on" v-if="mdAndUp">D11 Team</span>
          <span v-bind="attrs" v-on="on" v-else>D11</span>
        </template>
        <span>D11 team the player belongs to</span>
      </v-tooltip>
    </div>

    <!-- Team ------------------>
    <div class="team" v-if="['d11Team'].includes(view)">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">Team</span>
        </template>
        <span>Team the player belongs to</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerSeasonStatsHeader",
  props: {
    context: String,
    view: String
  }
};
</script>

<style lang="scss" scoped>
.season {
  padding-left: $d11-spacer;
  text-align: left !important;
  min-width: 5em;
}

.ranking,
.appearances,
.goals,
.own-goals,
.goal-assists {
  width: 3em;
}

.fee {
  padding-right: $d11-spacer;
  text-align: right !important;
  min-width: 2.3em;
}

.cards {
  width: 4.5em;
}

.rating,
.man-of-the-match {
  width: 3.2em;
}

.form {
  min-width: 11em;
}

.points {
  width: 2.5em;
  text-align: right !important;
  padding-right: $d11-spacer;
  padding-left: $d11-spacer;
}

.team,
.d11-team {
  padding-left: 6px;
  text-align: left;
  width: 15em;
}

.team-image-container {
  min-width: 2.6em;
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
    .points {
      width: 2.4em;
    }
    .team,
    .d11-team {
      width: 3.5em;
    }
  }
}

.v-application-xs {
  .context {
    margin-right: auto;
  }
  .d11-team {
    width: 3.5em;
  }
}
</style>
