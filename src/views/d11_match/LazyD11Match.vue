<template>
  <v-lazy
    class="d11-match-lazy"
    v-model="visible"
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
  >
    <v-list-item-title
      v-if="d11Match"
      class="d11-match"
      v-bind:class="{
        'full-time': this.fullTime(d11Match.status),
        finished: this.finished(d11Match.status)
      }"
    >
      <template v-if="['d11Team'].includes(view)">
        <!-- Date -------------------->
        <div class="match-date" v-if="['d11Team'].includes(view)">
          <template v-if="mdAndUp">
            {{ d11Match.datetime | moment("DD.MM YYYY") }}
          </template>
          <template v-else>
            {{ d11Match.datetime | moment("DD.MM") }}
          </template>
        </div>
        <!-- Kickoff ----------------->
        <div class="kickoff">
          {{ d11Match.datetime | moment("HH:mm") }}
        </div>
        <!-- Match Week -------------->
        <div class="match-week">
          <template v-if="mdAndUp">
            Match Week
          </template>
          {{ d11Match.matchWeek.matchWeekNumber }}
        </div>
      </template>
      <template v-else>
        <!-- Kickoff ----------------->
        <div class="kickoff">
          Kick Off {{ d11Match.datetime | moment("HH:mm") }}
        </div>
      </template>
      <div
        class="team home"
        v-bind:class="{ winner: d11Winner(d11Match, d11Match.homeD11Team.id) }"
      >
        <result-change
          v-if="d11Match.homeTeamPoints != d11Match.previousHomeTeamPoints"
          team="home"
          name="Points"
          :current="d11Match.homeTeamPoints"
          :previous="d11Match.previousHomeTeamPoints"
        />
        <result-change
          v-if="d11Match.homeTeamGoals != d11Match.previousHomeTeamGoals"
          team="home"
          :current="d11Match.homeTeamGoals"
          :previous="d11Match.previousHomeTeamGoals"
        />
        {{ d11Match.homeD11Team.name }}
      </div>
      <div class="image home">
        <d11-team-image
          :type="'team'"
          :size="'tiny'"
          :id="d11Match.homeD11Team.id"
        />
      </div>
      <template
        v-if="
          this.pending(d11Match.status) ||
            this.postponed(d11Match.status) ||
            d11Match.id == 6351
        "
      >
        <div class="pending">
          vs
        </div>
      </template>
      <template v-else>
        <div class="points">({{ d11Match.homeTeamPoints }})</div>
        <div class="goals">
          {{ d11Match.homeTeamGoals }}
          -
          {{ d11Match.awayTeamGoals }}
        </div>
        <div class="points">({{ d11Match.awayTeamPoints }})</div>
      </template>
      <div class="image home">
        <d11-team-image
          :type="'team'"
          :size="'tiny'"
          :id="d11Match.awayD11Team.id"
        />
      </div>
      <div
        class="team away"
        v-bind:class="{ winner: d11Winner(d11Match, d11Match.awayD11Team.id) }"
      >
        {{ d11Match.awayD11Team.name }}
        <result-change
          v-if="d11Match.awayTeamGoals != d11Match.previousawayTeamGoals"
          team="away"
          :current="d11Match.awayTeamGoals"
          :previous="d11Match.previousAwayTeamGoals"
        />
        <result-change
          v-if="d11Match.awayTeamPoints != d11Match.previousAwayTeamPoints"
          team="away"
          name="Points"
          :current="d11Match.awayTeamPoints"
          :previous="d11Match.previousAwayTeamPoints"
        />
      </div>
      <div class="elapsed">
        <elapsed
          v-if="this.active(d11Match.status) && this.d11Match.elapsed > 0"
          :elapsedTime="this.d11Match.elapsed"
        />
        <template v-if="this.fullTime(d11Match.status)">
          Full Time
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" class="not-finalized">*</span>
            </template>
            <span
              >Match stats for this D11 match have not yet been finalized and
              are subject to change.
            </span>
          </v-tooltip>
        </template>
        <template v-if="this.finished(d11Match.status)">
          Full Time
        </template>
      </div>
    </v-list-item-title>
  </v-lazy>
</template>

<script>
export default {
  name: "LazyD11Match",
  data: () => ({
    d11Match: null,
    visible: false
  }),
  components: {
    D11TeamImage: () => import("@/components/image/D11TeamImage"),
    Elapsed: () => import("@/components/Elapsed"),
    ResultChange: () => import("@/components/ResultChange")
  },
  props: {
    view: String,
    d11MatchId: Number
  },
  watch: {
    visible: function() {
      new this.$d11BootApi.D11MatchApi()
        .findD11MatchById(this.d11MatchId)
        .then(result => (this.d11Match = result));
    }
  }
};
</script>

<style lang="scss" scoped>
.d11-match {
  .match-date {
    min-width: 5.8em;
    text-align: left !important;
  }

  .kickoff {
    min-width: 3.8em;
    text-align: left !important;
  }

  .match-week {
    min-width: 6.4em;
  }

  .elapsed {
    min-width: 4.5em;
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

  .team.winner {
    font-weight: 600;
  }

  .team.away {
    margin-right: auto;
    text-align: left;
  }

  .image {
    min-width: 44px;
    padding: 0 $d11-spacer;
  }

  .pending {
    min-width: 6.1em;
  }

  .goals {
    min-width: 2.1em;
  }

  .points {
    min-width: 2em;
  }
}

.v-application-md,
.v-application-lg,
.v-application.xl {
  .match-week {
    text-align: left !important;
  }
}

.d11-match.full-time,
.d11-match.finished {
  .goals {
    font-weight: 600;
  }
}

.v-application-sm {
  .d11-match {
    .team {
      min-width: 11.5em;
    }
  }

  .d11-team {
    .match-date {
      min-width: 3em;
    }
    .match-week {
      min-width: 1.5em;
    }
    .team {
      min-width: 10.5em;
    }
  }
}
</style>
