<template>
  <div class="match">
    <!-- Header -------------------------------->
    <d11-header
      :backgroundPictureType="'stadium'"
      :backgroundPictureId="19"
      :backgroundPictureAlt="'TODO'"
      :parentLink="{
        text: match ? 'Match Week ' + match.matchWeek.matchWeekNumber : '',
        name: 'matchWeek',
        params: { id: match ? match.matchWeek.id : 0 }
      }"
    >
      <template v-if="match">
        <div class="header-title">
          <h1>Match Week {{ match.matchWeek.matchWeekNumber }}</h1>
          <div class="external-link">
            <a
              class="match-link"
              target="_blank"
              :href="
                'https://www.whoscored.com/Matches/' + match.whoscoredId + '/'
              "
            >
              View on Whoscored
            </a>
            <v-icon medium class="mdi-icon">mdi-chevron-right</v-icon>
          </div>
        </div>
        <div class="header-subtitle">
          <h4>Season {{ match.matchWeek.season.name }}</h4>
        </div>
        <div class="datetime">
          <v-icon medium class="mdi-icon">mdi-calendar-month</v-icon>
          <template v-if="!postponed(match.status)">
            {{ match.datetime | moment("dddd, MMMM Do YYYY") }}
          </template>
          <template v-else>
            Postponed
          </template>
        </div>

        <div class="stadium">
          <v-icon medium class="mdi-icon">mdi-stadium</v-icon>
          {{ match.stadium.name }}, {{ match.stadium.city }}
        </div>

        <!-- Time -------------------->
        <v-container class="time">
          <span class="kick-off">
            <template v-if="!postponed(match.status)">
              Kick Off {{ match.datetime | moment("HH:mm") }}
            </template>
            <template v-else>
              Postponed
            </template>
          </span>
        </v-container>

        <!-- Result ------------------>
        <div class="match-result">
          <div
            class="team home"
            v-if="mdAndUp || match.homeTeam.name.length < 20"
          >
            <team-image :size="'small'" :id="match.homeTeam.id" />
            {{ match.homeTeam.name }}
          </div>
          <div class="team home" v-else>
            <team-image :size="'small'" :id="match.homeTeam.id" />
            {{ match.homeTeam.shortName }}
          </div>
          <div
            class="highlight"
            v-if="!pending(match.status) && !postponed(match.status)"
          >
            <div class="score">
              {{ match.homeTeamGoals }} - {{ match.awayTeamGoals }}
            </div>
          </div>
          <div class="highlight" v-else>
            <div class="score">vs</div>
          </div>
          <div
            class="team away"
            v-if="mdAndUp || match.awayTeam.name.length < 20"
          >
            {{ match.awayTeam.name }}
            <team-image :size="'small'" :id="match.awayTeam.id" />
          </div>
          <div class="team away" v-else>
            {{ match.awayTeam.shortName }}
            <team-image :size="'small'" :id="match.awayTeam.id" />
          </div>
        </div>

        <!-- Elapsed ---------------->
        <v-container
          class="elapsed"
          v-bind:class="{ active: this.active(match.status) }"
          v-if="!pending(match.status) && !postponed(match.status)"
        >
          <span class="elapsed">{{ this.elapsedText(match.elapsed) }}</span>
        </v-container>

        <!-- Goals ---------------->
        <v-container
          class="match-goals-container"
          v-if="match.homeTeamGoals > 0 || match.awayTeamGoals > 0"
        >
          <div class="match-goals">
            <div class="goals home">
              <goal
                v-for="goal in match.goals.filter(goal => {
                  return goal.team.id == match.homeTeam.id;
                })"
                :key="goal.id"
                :goal="goal"
                :homeTeamGoal="true"
              />
            </div>
            <div class="goals away">
              <goal
                v-for="goal in match.goals.filter(goal => {
                  return goal.team.id == match.awayTeam.id;
                })"
                :key="goal.id"
                :goal="goal"
                :homeTeamGoal="false"
              />
            </div>
          </div>
        </v-container>
      </template>
    </d11-header>

    <content-section>
      <v-container class="player-stats-container tabs-container">
        <v-tabs :grow="xs" class="player-stats-tabs">
          <v-tab class="player-stats-tab">
            <template v-if="match">
              <team-image :size="'tiny'" :id="match.homeTeam.id" />
              <span v-if="smAndUp">{{ match.homeTeam.name }} Stats</span>
              <span v-if="xs">{{ match.homeTeam.shortName }}</span>
            </template>
          </v-tab>
          <v-tab class="player-stats-tab">
            <template v-if="match">
              <team-image :size="'tiny'" :id="match.awayTeam.id" />
              <span v-if="smAndUp">{{ match.awayTeam.name }} Stats</span>
              <span v-if="xs">{{ match.awayTeam.shortName }}</span>
            </template>
          </v-tab>
          <template v-if="match">
            <v-tab-item
              v-for="teamId in [match.homeTeam.id, match.awayTeam.id]"
              :key="teamId"
            >
              <player-stats-by-position
                :findPlayerStatParams="{ matchId: match.id, teamId: teamId }"
                :playerStatsByPosition="
                  teamId === match.homeTeam.id
                    ? homeTeamPlayerMatchStatsByPosition
                    : awayTeamPlayerMatchStatsByPosition
                "
                view="match"
                @visible="findPlayerMatchStats"
              />
            </v-tab-item>
          </template>
        </v-tabs>
      </v-container>
    </content-section>
  </div>
</template>

<script>
export default {
  name: "Match",
  data: () => ({
    match: null,
    homeTeamPlayerMatchStatsByPosition: null,
    awayTeamPlayerMatchStatsByPosition: null
  }),
  components: {
    D11Header: () => import("@/components/header/D11Header"),
    Goal: () => import("@/components/match_event/Goal"),
    ContentSection: () => import("@/components/ContentSection"),
    TeamImage: () => import("@/components/image/TeamImage"),
    PlayerStatsByPosition: () =>
      import("@/views/player_stat/PlayerStatsByPosition")
  },
  methods: {
    findPlayerMatchStats(findPlayerStatParams) {
      new this.$d11BootApi.PlayerMatchStatApi()
        .findActivePlayerMatchStatByMatchIdAndTeamId(
          findPlayerStatParams.matchId,
          findPlayerStatParams.teamId
        )
        .then(result => {
          var playerMatchStatsByPosition = this.$d11Mapper.playerStatsByPosition(
            result
          );
          if (findPlayerStatParams.teamId === this.match.homeTeam.id) {
            this.homeTeamPlayerMatchStatsByPosition = playerMatchStatsByPosition;
          } else {
            this.awayTeamPlayerMatchStatsByPosition = playerMatchStatsByPosition;
          }
        });
    }
  },
  mounted() {
    new this.$d11BootApi.MatchApi()
      .findMatchById(this.$route.params.id)
      .then(result => (this.match = result));
  }
};
</script>

<style lang="scss" scoped>
.time {
  display: flex;
  padding: 0;
  margin-top: 85px;

  span {
    margin: 0 auto;
  }
}
.match-result {
  display: flex;
  font-size: 1.75em;
  font-weight: 600;

  .team {
    background-color: var(--v-primary-base);
  }
  .team,
  .goals {
    width: 50%;
  }

  .team.home,
  .goals.away {
    padding-left: $d11-spacer;
    text-align: left;
  }

  .score {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100%;
    padding: $d11-spacer;
    text-align: center;
  }

  .team.away,
  .goals.home {
    padding-right: $d11-spacer;
    text-align: right;
  }

  .goals.home {
    padding-right: 3.5em;
  }
  .goals.away {
    padding-left: 3.5em;
  }
}

.elapsed {
  display: flex;
  padding: 0;

  span {
    margin: 0 auto;
  }
}

.match-goals-container {
  padding-top: 0;
  padding-bottom: 0;

  .match-goals {
    display: flex;
    .goals {
      width: 50%;
    }

    .goals.home {
      text-align: right;
      padding-right: 3.5em;
    }

    .goals.away {
      text-align: left;
      padding-left: 3.5em;
    }
  }
}
</style>
