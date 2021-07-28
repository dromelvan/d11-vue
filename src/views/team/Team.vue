<template>
  <div class="team">
    <!-- Header -------------------------------->
    <d11-header
      :backgroundPictureType="'stadium'"
      :backgroundPictureId="19"
      :backgroundPictureAlt="'TODO'"
      :parentLink="parentLink"
      :previousLink="{
        name: 'team',
        params: {
          id: team ? team.id : 0,
          seasonId: season ? season.id - 1 : 0,
          tab: tab
        },
        show: season && season.id > minSeasonId()
      }"
      :nextLink="{
        name: 'team',
        params: {
          id: team ? team.id : 0,
          seasonId: season ? season.id + 1 : 0,
          tab: tab
        },
        show: season && season.id < maxSeasonId()
      }"
    >
      <template v-if="team && season">
        <div class="header-title">
          <h1>{{ team.name }}</h1>
          <div class="external-link" v-if="smAndUp">
            <a class="team-link" target="_blank" :href="team.url">
              Official Site
            </a>
            <v-icon medium class="mdi-icon">mdi-chevron-right</v-icon>
          </div>
        </div>
        <div class="header-subtitle">
          <h4>Season {{ season.name }}</h4>
        </div>
        <div class="horizontal">
          <div class="team-image">
            <team-image :size="'large'" :id="team.id" v-if="smAndUp" />
            <team-image :size="'medium'" :id="team.id" v-else />
          </div>

          <div class="team-season-stats" v-if="teamSeasonStat">
            <div class="points-ranking">
              <span class="points">{{ teamSeasonStat.points }}</span>
              pts
              <span class="ranking">#{{ teamSeasonStat.ranking }}</span>
              ranking
            </div>
            <div v-if="teamSeasonStat.winCount && finished(season.status)">
              {{ teamSeasonStat.winCount | ordinal({ includeNumber: true }) }}
              league victory
            </div>
            <div class="goals-for" v-if="smAndUp">
              {{ teamSeasonStat.goalsFor }} goals scored
            </div>
            <div class="goals-against" v-if="smAndUp">
              {{ teamSeasonStat.goalsAgainst }} goals conceded
            </div>
            <div class="goal-difference" v-if="smAndUp">
              <template v-if="teamSeasonStat.goalDifference > 0">
                +{{ teamSeasonStat.goalDifference }}
              </template>
              <template v-else>
                {{ teamSeasonStat.goalDifference }}
              </template>
              goal difference
            </div>
            <div class="team-form" v-if="smAndUp">
              <result-indicator
                v-for="formMatchPoint in formMatchPoints"
                :key="formMatchPoint.index"
                :formMatchPoint="formMatchPoint"
              />
            </div>
          </div>

          <div class="team-info" v-if="smAndUp">
            <div class="established">Established {{ team.established }}</div>
            <div class="stadium">
              <v-icon medium class="mdi-icon">mdi-stadium</v-icon>
              {{ team.stadium.name }}, {{ team.stadium.city }}
            </div>
            <div class="nickname">"{{ team.nickname }}"</div>
          </div>
        </div>
      </template>
    </d11-header>

    <!-- Content ------------------------------->
    <content-section>
      <v-container class="tabs-container">
        <v-tabs v-model="tab">
          <v-tab class="squad-tab" href="#squad">
            <template v-if="season"> Squad {{ season.name }} </template>
          </v-tab>
          <v-tab class="matches-tab" href="#matches">
            <template v-if="season"> Matches {{ season.name }} </template>
          </v-tab>
          <v-tabs-items :value="tab">
            <v-tab-item value="squad" v-if="teamSeasonStat">
              <player-season-stats-by-position
                :findPlayerSeasonStatParams="{
                  teamId: team.id,
                  seasonId: season.id
                }"
                :playerSeasonStatsByPosition="playerSeasonStatsByPosition"
                view="team"
                @findPlayerSeasonStats="findPlayerSeasonStats"
              />
            </v-tab-item>
            <v-tab-item value="squad" v-else>
              <div class="no-data" v-if="team && season">
                {{ team.name }} did not participate in the
                {{ season.name }} season.
              </div>
            </v-tab-item>
            <v-tab-item value="matches" v-if="teamSeasonStat">
              <lazy-match-list
                v-for="team in [this.team]"
                :key="team.id"
                :view="'team'"
                :matchIds="matchIds"
              />
            </v-tab-item>
            <v-tab-item value="matches" v-else>
              <div class="no-data" v-if="team && season">
                {{ team.name }} did not participate in the
                {{ season.name }} season.
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-container>
    </content-section>
  </div>
</template>

<script>
import TeamService from "@/services/team.service";
import PlayerSeasonStatService from "@/services/playerSeasonStat.service";

export default {
  name: "Team",
  data: () => ({
    team: null,
    season: null,
    teamSeasonStat: null,
    playerSeasonStatsByPosition: null,
    matchIds: null,
    tab: "squad"
  }),
  components: {
    D11Header: () => import("@/components/header/D11Header"),
    TeamImage: () => import("@/components/image/TeamImage"),
    ResultIndicator: () => import("@/components/ResultIndicator"),
    ContentSection: () => import("@/components/ContentSection"),
    PlayerSeasonStatsByPosition: () =>
      import("@/views/player_season_stat/PlayerSeasonStatsByPosition"),
    LazyMatchList: () => import("@/views/match/LazyMatchList")
  },
  computed: {
    formMatchPoints() {
      var formMatchPoints = [];
      this.teamSeasonStat.formMatchPoints.forEach(function(item, index) {
        formMatchPoints.push({ index: index, points: item });
      });
      return formMatchPoints;
    },
    parentLink() {
      if (this.$route.params.parentLink) {
        return this.$route.params.parentLink;
      } else {
        return {
          text: this.season ? "Season " + this.season.name : "",
          name: "season",
          params: { id: this.season ? this.season.id : 0 }
        };
      }
    }
  },
  methods: {
    loadData: function() {
      TeamService.getTeamSeasonData(
        this.$route.params.id,
        this.$route.params.seasonId
      ).then(result => {
        this.team = result.team;
        this.season = result.season;
        this.teamSeasonStat = result.teamSeasonStat;
        this.matchIds = result.matchIds;
        this.playerSeasonStatsByPosition = null;
      });
    },
    findPlayerSeasonStats: function() {
      PlayerSeasonStatService.getPlayerSeasonStatsByTeamIdAndSeasonId(
        this.$route.params.id,
        this.$route.params.seasonId
      ).then(
        result =>
          (this.playerSeasonStatsByPosition = this.$d11Mapper.playerStatsByPosition(
            result
          ))
      );
    }
  },
  mounted() {
    this.tab = this.$route.params.tab;
    this.loadData();
  },
  watch: {
    $route() {
      this.tab = this.$route.params.tab;
      if (
        this.teamSeasonStat == null ||
        this.$route.params.id != this.team.id ||
        this.$route.params.seasonId != this.season.id
      ) {
        this.loadData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.team-season-stats {
  margin-top: -0.4em;
  padding-right: 24px;

  .points {
    font-size: 2em;
  }

  .ranking {
    font-size: 1.8em;
  }

  .team-form {
    padding-top: $d11-spacer;
  }
}

.no-data {
  padding: $d11-spacer;
}

.v-application-xs {
  .team-season-stats {
    margin-top: unset;
    padding-right: unset;
  }
}
</style>
