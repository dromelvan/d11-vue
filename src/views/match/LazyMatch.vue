<template>
  <v-lazy
    class="match-lazy"
    v-model="visible"
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
  >
    <div v-bind:class="{ padded: smAndUp && matchLogMessages }">
      <v-list-item-title
        v-if="match"
        class="match"
        v-bind:class="{
          'full-time': this.fullTime(match.status),
          finished: this.finished(match.status)
        }"
      >
        <!-- XS view ------------------------>
        <template v-if="xs">
          <div class="match-result">
            <div class="match-date">
              <div v-if="isView(['team'])">
                {{ match.datetime | moment("DD.MM") }}
              </div>
              <div v-else>K/O</div>
              <div>
                <template v-if="!this.postponed(match.status)">
                  {{ match.datetime | moment("HH:mm") }}
                </template>
                <template v-else>
                  PP
                </template>
              </div>
            </div>
            <!-- Match Week -------------->
            <div class="match-week" v-if="isView(['team'])">
              {{ match.matchWeek.matchWeekNumber }}
            </div>
            <div>
              <div class="image home">
                <team-image
                  :type="'team'"
                  :size="'icon'"
                  :id="match.homeTeam.id"
                />
              </div>
              <div class="image away">
                <team-image
                  :type="'team'"
                  :size="'icon'"
                  :id="match.awayTeam.id"
                />
              </div>
            </div>
            <div class="teams">
              <div
                class="team"
                v-bind:class="{ winner: winner(match, match.homeTeam.id) }"
              >
                {{ match.homeTeam.shortName }}
              </div>
              <div
                class="team"
                v-bind:class="{ winner: winner(match, match.awayTeam.id) }"
              >
                {{ match.awayTeam.shortName }}
              </div>
            </div>
            <div class="result-changes">
              <div>
                <result-change
                  v-if="match.homeTeamGoals != match.previousHomeTeamGoals"
                  team="away"
                  :current="match.homeTeamGoals"
                  :previous="match.previousHomeTeamGoals"
                />
              </div>
              <div>
                <result-change
                  v-if="match.awayTeamGoals != match.previousAwayTeamGoals"
                  team="away"
                  :current="match.awayTeamGoals"
                  :previous="match.previousAwayTeamGoals"
                />
              </div>
            </div>
            <div class="elapsed">
              <elapsed
                v-if="this.active(match.status)"
                :elapsedTime="this.match.elapsed"
              />
              <template v-if="this.fullTime(match.status)">
                FT
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on" class="not-finalized"
                      >*</span
                    >
                  </template>
                  <span
                    >Match stats for this match have not yet been finalized and
                    are subject to change.
                  </span>
                </v-tooltip>
              </template>
              <template v-if="this.finished(match.status)">
                FT
              </template>
            </div>
            <div class="score" v-if="!this.pending(match.status)">
              <div>{{ match.homeTeamGoals }}</div>
              <div>{{ match.awayTeamGoals }}</div>
            </div>
          </div>
        </template>

        <!-- SM and up view ----------------->
        <template v-else>
          <template v-if="['team'].includes(view)">
            <!-- Date -------------------->
            <div class="match-date" v-if="['team'].includes(view)">
              <template v-if="!this.postponed(match.status)">
                <template v-if="mdAndUp">
                  {{ match.datetime | moment("DD.MM YYYY") }}
                </template>
                <template v-else>
                  {{ match.datetime | moment("DD.MM") }}
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
            <div class="kickoff">
              <template v-if="!this.postponed(match.status)">
                {{ match.datetime | moment("HH:mm") }}
              </template>
            </div>
            <!-- Match Week -------------->
            <div class="match-week">
              <template v-if="mdAndUp">
                Match Week
              </template>
              {{ match.matchWeek.matchWeekNumber }}
            </div>
          </template>
          <template v-else>
            <!-- Kickoff ----------------->
            <div class="kickoff">
              <template v-if="!this.postponed(match.status)">
                Kick Off {{ match.datetime | moment("HH:mm") }}
              </template>
            </div>
            <!-- Match Week -------------->
            <div class="match-week" v-if="isView(['current'])">
              <template v-if="mdAndUp">
                Match Week
              </template>
              <template v-else>
                MW
              </template>
              {{ match.matchWeek.matchWeekNumber }}
            </div>
          </template>
          <!-- Home team --------------->
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
          <!-- Score ------------------>
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
          <!-- Away team -------------->
          <div class="image away">
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
          <!-- Elapsed ----------------->
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
                  >Match stats for this match have not yet been finalized and
                  are subject to change.
                </span>
              </v-tooltip>
            </template>
            <template v-if="this.finished(match.status)">
              Full Time
            </template>
          </div>
        </template>
      </v-list-item-title>
      <!-- Goals ---------------------------------------------------------------->
      <v-list-item-title
        class="goals"
        v-if="smAndUp && match && match.goals.length > 0 && showGoals"
      >
        <template v-if="['team'].includes(view)">
          <div class="match-date" v-if="['team'].includes(view)">
            &nbsp;
          </div>
          <div class="kickoff">
            &nbsp;
          </div>
          <div class="match-week">
            &nbsp;
          </div>
        </template>
        <template v-else>
          <div class="kickoff">
            &nbsp;
          </div>
          <div class="match-week" v-if="isView(['current'])">
            &nbsp;
          </div>
        </template>

        <div class="home-team-goals">
          <goal
            v-for="goal in match.goals.filter(goal => {
              return goal.team.id == match.homeTeam.id;
            })"
            :key="goal.id"
            :goal="goal"
            :homeTeamGoal="true"
            class="goal-light"
          />
        </div>
        <div class="score">&nbsp;</div>
        <div class="away-team-goals">
          <goal
            v-for="goal in match.goals.filter(goal => {
              return goal.team.id == match.awayTeam.id;
            })"
            :key="goal.id"
            :goal="goal"
            :homeTeamGoal="false"
            class="goal-light"
          />
        </div>

        <div class="elapsed">&nbsp;</div>
      </v-list-item-title>

      <template v-if="administrator() && smAndUp && matchLogMessages">
        <v-list-item-title
          v-for="(matchLogMessage, index) in matchLogMessages"
          :key="index"
        >
          {{ matchLogMessage.message }}
        </v-list-item-title>
      </template>
    </div>
  </v-lazy>
</template>

<script>
export default {
  name: "LazyMatch",
  data: () => ({
    match: null,
    visible: false,
    showGoals: false // Remove this if we want to start showing goals
  }),
  components: {
    TeamImage: () => import("@/components/image/TeamImage"),
    Elapsed: () => import("@/components/Elapsed"),
    ResultChange: () => import("@/components/ResultChange"),
    Goal: () => import("@/components/match_event/Goal")
  },
  methods: {
    loadData: function() {
      new this.$d11BootApi.MatchApi()
        .findMatchById(this.matchId)
        .then(result => (this.match = result));
    },
    refresh: function() {
      this.match = null;
      this.loadData();
    }
  },
  props: {
    view: String,
    matchId: Number
  },
  computed: {
    matchLogMessages() {
      if (
        this.match &&
        !this.finished(this.match.status) &&
        this.match.matchLogMessages.length > 0
      ) {
        return this.match.matchLogMessages;
      } else {
        return null;
      }
    }
  },
  watch: {
    visible: function() {
      this.loadData();
    }
  }
};
</script>

<style lang="scss" scoped>
.padded {
  padding-top: $d11-spacer;
  padding-bottom: $d11-spacer;
}

.match {
  margin: 7px 0px 7px 0px;
}

.goals {
  margin-bottom: 5px;
}

.match,
.goals {
  .match-date {
    min-width: 5.8em;
    text-align: left !important;
  }
  .kickoff {
    min-width: 5.8em;
  }

  .elapsed {
    min-width: 4.5em;
  }

  .kickoff {
    text-align: left !important;
  }

  .match-week {
    min-width: 6.4em;
  }

  .elapsed {
    text-align: right !important;
    .progress {
      font-size: 0.6em;
    }
  }
  .team,
  .home-team-goals,
  .away-team-goals {
    min-width: 16.5em;
  }
  .team.home,
  .home-team-goals {
    margin-left: auto;
    text-align: right !important;
  }

  .team.away,
  .away-team-goals {
    margin-right: auto;
    text-align: left !important;
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

  .home-team-goals,
  .away-team-goals {
    margin-bottom: auto;
  }

  .home-team-goals {
    padding-right: 13px;
  }

  .away-team-goals {
    padding-left: 13px;
  }
}

.home {
  .match {
    .kickoff {
      min-width: 7em;
    }
  }
}

.match.full-time,
.match.finished {
  .score {
    font-weight: 600;
  }
}

.v-application-md,
.v-application-lg,
.v-application.xl {
  .match-week {
    text-align: left !important;
  }
}

.v-application-sm {
  .match,
  .team {
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

.v-application-xs {
  .match {
    .match-result {
      display: flex;
      width: 100%;
    }

    .match-date {
      min-width: 3em;
    }
    .match-week {
      min-width: 1.5em;
      margin-top: auto;
      margin-bottom: auto;
    }

    .image,
    .team,
    .score {
      min-width: unset;
    }

    .image {
      margin-top: -1px;
    }

    .teams {
      margin-right: auto;
      text-align: left;
    }

    .score {
      min-width: 1.5em;
      text-align: right;
    }

    .elapsed {
      margin-top: auto;
      margin-bottom: auto;
      min-width: 1.3em;
      padding-left: $d11-large-spacer;
    }
  }
}
</style>
