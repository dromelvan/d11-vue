<template>
  <v-lazy
    class="match-lazy"
    v-model="visible"
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
  >
    <v-list-item-title
      v-if="match"
      class="match"
      v-bind:class="{
        'full-time': this.fullTime(match.status),
        finished: this.finished(match.status)
      }"
    >
      <div class="kickoff">
        <template v-if="!this.postponed(match.status)">
          Kick Off {{ match.datetime | moment("HH:mm") }}
        </template>
      </div>
      <div
        class="team home"
        v-bind:class="{ winner: winner(match, match.homeTeam.id) }"
      >
        <result-change
          v-if="match.homeTeamGoals != match.previousHomeTeamGoals"
          team="home"
          :current="match.homeTeamGoals"
          :previous="match.previousHomeTeamGoals"
        />
        {{ match.homeTeam.name }}
      </div>
      <div class="image home">
        <team-image :type="'team'" :size="'tiny'" :id="match.homeTeam.id" />
      </div>
      <div class="score">
        <template
          v-if="this.pending(match.status) || this.postponed(match.status)"
        >
          vs
        </template>
        <template v-else>
          {{ match.homeTeamGoals }}-{{ match.awayTeamGoals }}
        </template>
      </div>
      <div class="image home">
        <team-image :type="'team'" :size="'tiny'" :id="match.awayTeam.id" />
      </div>
      <div
        class="team away"
        v-bind:class="{ winner: winner(match, match.awayTeam.id) }"
      >
        {{ match.awayTeam.name }}
        <result-change
          v-if="match.awayTeamGoals != match.previousawayTeamGoals"
          team="away"
          :current="match.awayTeamGoals"
          :previous="match.previousAwayTeamGoals"
        />
      </div>
      <div class="elapsed">
        <elapsed
          v-if="this.active(match.status)"
          :elapsedTime="this.match.elapsed"
        />
        <template v-if="this.fullTime(match.status)">
          Full Time
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" class="not-finalized">*</span>
            </template>
            <span
              >Match stats for this match have not yet been finalized and are
              subject to change.
            </span>
          </v-tooltip>
        </template>
        <template v-if="this.finished(match.status)">
          Full Time
        </template>
      </div>
    </v-list-item-title>
  </v-lazy>
</template>

<script>
export default {
  name: "LazyMatch",
  data: () => ({
    match: null,
    visible: false
  }),
  components: {
    TeamImage: () => import("@/components/image/TeamImage"),
    Elapsed: () => import("@/components/Elapsed"),
    ResultChange: () => import("@/components/ResultChange")
  },
  props: {
    matchId: Number
  },
  watch: {
    visible: function() {
      new this.$d11BootApi.MatchApi()
        .findMatchById(this.matchId)
        .then(result => (this.match = result));
    }
  }
};
</script>

<style lang="scss" scoped>
.match {
  .kickoff,
  .elapsed {
    min-width: 4.5em;
  }

  .kickoff {
    text-align: left !important;
  }

  .elapsed {
    text-align: right !important;
    .progress {
      font-size: 0.6em;
    }
  }
  .team {
    min-width: 16.5em;
  }
  .team.home {
    margin-left: auto;
    text-align: right;
  }

  .team.away {
    margin-right: auto;
    text-align: left;
  }

  .result-change,
  .team.winner {
    font-weight: 600;
  }

  .image {
    min-width: 44px;
    padding: 0 $d11-spacer;
  }

  .score {
    min-width: 2em;
  }
}

.match.full-time,
.match.finished {
  .score {
    font-weight: 600;
  }
}

.v-application-sm {
  .match {
    .team {
      min-width: 13.5em;
    }
  }
}
</style>
