<template>
  <div class="list-container-header">
    <template>
      <!-- Ranking -------------->
      <div class="ranking">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">#</span>
          </template>
          <span>League position</span>
        </v-tooltip>
      </div>
      <!-- Name ----------------->
      <div class="team" v-if="['team'].includes(view)">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Team</span>
          </template>
          <span>The name of the team</span>
        </v-tooltip>
      </div>
      <div class="d11-team" v-else>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">D11 Team</span>
          </template>
          <span>The name of the D11 team</span>
        </v-tooltip>
      </div>
      <!-- Matches played -------->
      <div class="matches-played stat after-main-item" v-if="smAndUp">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Played</span>
          </template>
          <span>Matches played</span>
        </v-tooltip>
      </div>
      <!-- Matches won ----------->
      <div class="matches-won stat" v-if="smAndUp">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Won</span>
          </template>
          <span>Matches won</span>
        </v-tooltip>
      </div>
      <!-- Matches drawn --------->
      <div class="matches-drawn stat" v-if="smAndUp">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Drawn</span>
          </template>
          <span>Matches drawn</span>
        </v-tooltip>
      </div>
      <!-- Matches lost ---------->
      <div class="matches-lost stat" v-if="smAndUp">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Lost</span>
          </template>
          <span>Matches lost</span>
        </v-tooltip>
      </div>
      <!-- Goals for ------------->
      <div class="goals-for stat" v-if="smAndUp">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <template v-if="smAndDown">
                G+
              </template>
              <template v-else>Goals+</template>
            </span>
          </template>
          <span>Goals for</span>
        </v-tooltip>
      </div>
      <!-- Goals against --------->
      <div class="goals-for stat" v-if="smAndUp">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <template v-if="smAndDown">
                G-
              </template>
              <template v-else>Goals-</template>
            </span>
          </template>
          <span>Goals against</span>
        </v-tooltip>
      </div>
      <!-- Goal difference ------>
      <div class="goals-difference stat" v-if="smAndUp">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">GD</span>
          </template>
          <span>Goal difference</span>
        </v-tooltip>
      </div>
      <!-- Form ----------------->
      <div class="form" v-if="mdAndUp">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Form</span>
          </template>
          <span>Results over the last five games</span>
        </v-tooltip>
      </div>
      <!-- Points --------------->
      <div class="points stat">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Points</span>
          </template>
          <span>Points</span>
        </v-tooltip>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "LeagueTableHeader",
  props: {
    view: String
  }
};
</script>

<style lang="scss" scoped>
.ranking {
  min-width: 3rem;
}

.stat {
  min-width: 3.8rem;
}

.form {
  min-width: 165px;
}

.v-application-xs {
  .points {
    margin-left: auto;
  }
}
</style>
