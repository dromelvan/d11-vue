<template>
  <list-container>
    <template v-slot:header>
      <div class="list-container-header">
        <div class="match-date" v-if="isView(['matchWeek', 'current'])">
          <template v-if="date === 'Postponed'">
            {{ date }}
          </template>
          <template v-else>
            {{ date | moment("dddd, MMMM Do YYYY") }}
          </template>
        </div>
        <div class="match-date" v-if="['team'].includes(view)">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Date</span>
            </template>
            <span>The date of the match</span>
          </v-tooltip>
        </div>
        <div class="kickoff" v-if="['team'].includes(view) && smAndUp">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Kickoff</span>
            </template>
            <span>The time the match kicks off</span>
          </v-tooltip>
        </div>
        <div class="match-week" v-if="['team'].includes(view)">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" v-if="mdAndUp">Match Week</span>
              <span v-bind="attrs" v-on="on" v-else>MW</span>
            </template>
            <span>The match week the match is played in</span>
          </v-tooltip>
        </div>
        <div class="team home" v-if="['team'].includes(view) && smAndUp">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Home Team</span>
            </template>
            <span>The home team for the match</span>
          </v-tooltip>
        </div>
        <div class="score" v-if="['team'].includes(view) && smAndUp">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Result</span>
            </template>
            <span>The result of the match, if it has been played</span>
          </v-tooltip>
        </div>
        <div class="team away" v-if="['team'].includes(view) && smAndUp">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Away Team</span>
            </template>
            <span>The away team for the match</span>
          </v-tooltip>
        </div>
        <div class="elapsed" v-if="['team'].includes(view) && smAndUp">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Elapsed</span>
            </template>
            <span>The elapsed time of the match, if it has started</span>
          </v-tooltip>
        </div>
      </div>
    </template>
    <div v-for="matchId in matchIds" :key="matchId">
      <list-container-item :to="{ name: 'match', params: { id: matchId } }">
        <lazy-match :matchId="matchId" :view="view" ref="match" />
      </list-container-item>
      <v-divider />
    </div>
  </list-container>
</template>

<script>
export default {
  name: "LazyMatchList",
  props: {
    date: String,
    matchIds: Array,
    view: {
      type: String,
      default: "matchWeek"
    }
  },
  methods: {
    refresh: function() {
      for (let ref of this.$refs.match) {
        ref.refresh();
      }
    }
  },
  components: {
    ListContainer: () => import("@/components/ListContainer"),
    ListContainerItem: () => import("@/components/ListContainerItem"),
    LazyMatch: () => import("@/views/match/LazyMatch")
  },
  parentLink() {
    if (this.view === "player") {
      let homeTeam = this.playerStat.match.homeTeam;
      let awayTeam = this.playerStat.match.awayTeam;
      return {
        text: this.smAndUp
          ? homeTeam.shortName + " vs " + awayTeam.shortName
          : homeTeam.code + " vs " + awayTeam.code,
        name: "match",
        params: { id: this.playerStat.match.id }
      };
    }
    return null;
  }
};
</script>

<style lang="scss" scoped>
.match,
.team {
  .match-date {
    min-width: 5.8rem;
    text-align: left;
  }

  .kickoff {
    text-align: left;
    min-width: 3.8rem;
  }

  .match-week {
    min-width: 6.4rem;
  }

  .team {
    min-width: 16.5rem;
  }
  .team.home {
    margin-left: auto;
    text-align: right;
  }

  .team.away {
    margin-right: auto;
    text-align: left;
  }

  .score {
    min-width: calc(2rem + 88px);
  }

  .elapsed {
    min-width: 4.5rem;
    text-align: right;
  }
}

.v-application-md,
.v-application-lg,
.v-application.xl {
  .match-week {
    text-align: left;
  }
}

.v-application-sm {
  .match,
  .team {
    .match-date {
      min-width: 3rem;
    }
    .match-week {
      min-width: 1.5rem;
    }
    .team {
      min-width: 10.5rem;
    }
  }
}

.v-application-xs {
  .match-date {
    min-width: 3rem;
  }
  .match-week {
    min-width: 1.5rem;
  }
}
</style>
