<template>
  <div class="d11-match">
    <!-- Header -------------------------------->
    <d11-header
      :backgroundPictureType="'stadium'"
      :backgroundPictureId="19"
      :backgroundPictureAlt="'TODO'"
      :parentLink="{
        text: d11Match
          ? 'Match Week ' + d11Match.matchWeek.matchWeekNumber
          : '',
        name: 'matchWeek',
        params: { id: d11Match ? d11Match.matchWeek.id : 0, tab: 'd11-matches' }
      }"
    >
      <div class="header-title" v-if="d11Match">
        <h1>Match Week {{ d11Match.matchWeek.matchWeekNumber }}</h1>
      </div>
      <div class="header-subtitle" v-if="d11Match">
        <h4>Season {{ d11Match.matchWeek.season.name }}</h4>
      </div>
      <div class="datetime" v-if="d11Match">
        <v-icon medium class="mdi-icon">mdi-calendar-month</v-icon>
        <template v-if="!postponed(d11Match.status)">
          {{ d11Match.datetime | moment("dddd, MMMM Do YYYY") }}
        </template>
        <template v-else>
          Postponed
        </template>
      </div>

      <!-- Time -------------------->
      <v-container class="time">
        <span class="kick-off" v-if="d11Match">
          <template v-if="!postponed(d11Match.status)">
            Kick Off {{ d11Match.datetime | moment("HH:mm") }}
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
          v-if="d11Match && (mdAndUp || d11Match.homeD11Team.name.length < 20)"
        >
          <d11-team-image :size="'small'" :id="d11Match.homeD11Team.id" />
          {{ d11Match.homeD11Team.name }}
        </div>
        <div class="team home" v-else>
          <template v-if="d11Match">
            <d11-team-image :size="'small'" :id="d11Match.homeD11Team.id" />
            {{ d11Match.homeD11Team.shortName }}
          </template>
        </div>
        <div class="team-points home">
          <template v-if="d11Match"> ({{ d11Match.homeTeamPoints }}) </template>
        </div>
        <div
          class="highlight"
          v-if="
            d11Match && !pending(d11Match.status) && !postponed(d11Match.status)
          "
        >
          <div class="score">
            <template v-if="d11Match">
              {{ d11Match.homeTeamGoals }} - {{ d11Match.awayTeamGoals }}
            </template>
          </div>
        </div>
        <div class="highlight" v-else>
          <div class="score">vs</div>
        </div>
        <div class="team-points away">
          <template v-if="d11Match"> ({{ d11Match.awayTeamPoints }}) </template>
        </div>
        <div
          class="team away"
          v-if="d11Match && (mdAndUp || d11Match.awayD11Team.name.length < 20)"
        >
          {{ d11Match.awayD11Team.name }}
          <d11-team-image :size="'small'" :id="d11Match.awayD11Team.id" />
        </div>
        <div class="team away" v-else>
          <template v-if="d11Match">
            {{ d11Match.awayD11Team.shortName }}
            <d11-team-image :size="'small'" :id="d11Match.awayD11Team.id" />
          </template>
        </div>
      </div>

      <!-- Elapsed ---------------->
      <v-container
        class="elapsed"
        v-bind:class="{ active: this.active(d11Match.status) }"
        v-if="
          d11Match && !pending(d11Match.status) && !postponed(d11Match.status)
        "
      >
        <span class="elapsed">{{ this.elapsedText(d11Match.elapsed) }}</span>
      </v-container>
    </d11-header>

    <content-section>
      <v-container class="player-stats-container tabs-container">
        <v-tabs :grow="xs" class="player-stats-tabs">
          <v-tab class="player-stats-tab">
            <template v-if="d11Match">
              <d11-team-image :size="'tiny'" :id="d11Match.homeD11Team.id" />
              <span v-if="smAndUp">{{ d11Match.homeD11Team.name }} Stats</span>
              <span v-if="xs">{{ d11Match.homeD11Team.shortName }}</span>
            </template>
          </v-tab>
          <v-tab class="player-stats-tab">
            <template v-if="d11Match">
              <d11-team-image :size="'tiny'" :id="d11Match.awayD11Team.id" />
              <span v-if="smAndUp">{{ d11Match.awayD11Team.name }} Stats</span>
              <span v-if="xs">{{ d11Match.awayD11Team.shortName }}</span>
            </template>
          </v-tab>
          <template v-if="d11Match">
            <v-tab-item
              v-for="d11TeamId in [
                d11Match.homeD11Team.id,
                d11Match.awayD11Team.id
              ]"
              :key="d11TeamId"
            >
              <player-stats-by-position
                :findPlayerStatParams="{
                  d11MatchId: d11Match.id,
                  d11TeamId: d11TeamId
                }"
                :playerStatsByPosition="
                  d11TeamId === d11Match.homeD11Team.id
                    ? homeD11TeamPlayerMatchStatsByPosition
                    : awayD11TeamPlayerMatchStatsByPosition
                "
                :d11Match="d11Match"
                view="d11Match"
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
  name: "D11Match",
  data: () => ({
    d11Match: null,
    homeD11TeamPlayerMatchStatsByPosition: null,
    awayD11TeamPlayerMatchStatsByPosition: null
  }),
  components: {
    D11Header: () => import("@/components/header/D11Header"),
    ContentSection: () => import("@/components/ContentSection"),
    D11TeamImage: () => import("@/components/image/D11TeamImage"),
    PlayerStatsByPosition: () =>
      import("@/views/player_stat/PlayerStatsByPosition")
  },
  methods: {
    findPlayerMatchStats(findPlayerStatParams) {
      new this.$d11BootApi.PlayerMatchStatApi()
        .findPlayerMatchStatByD11MatchIdAndD11TeamId(
          findPlayerStatParams.d11MatchId,
          findPlayerStatParams.d11TeamId
        )
        .then(result => {
          var playerMatchStatsByPosition = this.$d11Mapper.playerStatsByPosition(
            result
          );
          if (findPlayerStatParams.d11TeamId === this.d11Match.homeD11Team.id) {
            this.homeD11TeamPlayerMatchStatsByPosition = playerMatchStatsByPosition;
          } else {
            this.awayD11TeamPlayerMatchStatsByPosition = playerMatchStatsByPosition;
          }
        });
    }
  },
  mounted() {
    new this.$d11BootApi.D11MatchApi()
      .findD11MatchById(this.$route.params.id)
      .then(result => (this.d11Match = result));
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

  .team-points {
    display: flex;
    align-items: center;
    padding-left: $d11-spacer;
    padding-right: $d11-spacer;
    background-color: var(--v-primary-base);
    width: 100px;
  }
  .team-points.home {
    justify-content: flex-end;
  }
  .team-points.away {
    justify-content: flex-start;
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
</style>
