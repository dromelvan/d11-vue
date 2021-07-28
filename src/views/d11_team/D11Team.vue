<template>
  <div class="d11-team">
    <!-- Header -------------------------------->
    <d11-header
      :backgroundPictureType="'stadium'"
      :backgroundPictureId="19"
      :backgroundPictureAlt="'TODO'"
      :parentLink="parentLink"
      :previousLink="{
        name: 'd11Team',
        params: {
          id: d11Team ? d11Team.id : 0,
          seasonId: season ? season.id - 1 : 0,
          tab: tab
        },
        show: season && season.id > minSeasonId()
      }"
      :nextLink="{
        name: 'd11Team',
        params: {
          id: d11Team ? d11Team.id : 0,
          seasonId: season ? season.id + 1 : 0,
          tab: tab
        },
        show: season && season.id < maxSeasonId()
      }"
    >
      <template v-if="d11Team && season">
        <div class="header-title">
          <h1>{{ d11Team.name }}</h1>
        </div>
        <div class="header-subtitle">
          <h4>Season {{ season.name }}</h4>
        </div>
        <div class="horizontal">
          <div class="d11-team-image">
            <d11-team-image :size="'large'" :id="d11Team.id" v-if="smAndUp" />
            <d11-team-image :size="'medium'" :id="d11Team.id" v-else />
          </div>

          <div class="d11-team-season-stats" v-if="d11TeamSeasonStat">
            <div class="points-ranking">
              <span class="points">{{ d11TeamSeasonStat.points }}</span>
              pts
              <span class="ranking">#{{ d11TeamSeasonStat.ranking }}</span>
              ranking
            </div>
            <div v-if="d11TeamSeasonStat.winCount && finished(season.status)">
              {{
                d11TeamSeasonStat.winCount | ordinal({ includeNumber: true })
              }}
              D11 league victory
            </div>
            <div class="goals-for" v-if="smAndUp">
              {{ d11TeamSeasonStat.goalsFor }} goals scored
            </div>
            <div class="goals-against" v-if="smAndUp">
              {{ d11TeamSeasonStat.goalsAgainst }} goals conceded
            </div>
            <div class="goal-difference" v-if="smAndUp">
              <template v-if="d11TeamSeasonStat.goalDifference > 0">
                +{{ d11TeamSeasonStat.goalDifference }}
              </template>
              <template v-else>
                {{ d11TeamSeasonStat.goalDifference }}
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
        </div>
      </template>
    </d11-header>

    <!-- Content ------------------------------->
    <content-section>
      <v-container class="tabs-container">
        <v-tabs v-model="tab">
          <v-tab class="squad-tab" href="#squad">
            <template v-if="season">Squad {{ season.name }}</template>
          </v-tab>
          <v-tab class="matches-tab" href="#matches">
            <template v-if="season">Matches {{ season.name }}</template>
          </v-tab>
          <v-tabs-items :value="tab">
            <v-tab-item value="squad" v-if="d11TeamSeasonStat">
              <player-season-stats-by-position
                :findPlayerSeasonStatParams="{
                  d11TeamId: d11Team.id,
                  seasonId: season.id
                }"
                :playerSeasonStatsByPosition="playerSeasonStatsByPosition"
                view="d11Team"
                @findPlayerSeasonStats="findPlayerSeasonStats"
              />
            </v-tab-item>
            <v-tab-item value="squad" v-else>
              <div class="no-data" v-if="d11Team && season">
                {{ d11Team.name }} did not participate in the
                {{ season.name }} season.
              </div>
            </v-tab-item>
            <v-tab-item value="matches" v-if="d11TeamSeasonStat">
              <lazy-d11-match-list
                v-for="d11Team in [this.d11Team]"
                :key="d11Team.id"
                :view="'d11Team'"
                :d11MatchIds="d11MatchIds"
              />
            </v-tab-item>
            <v-tab-item value="matches" v-else>
              <div class="no-data" v-if="d11Team && season">
                {{ d11Team.name }} did not participate in the
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
import D11TeamService from "@/services/d11Team.service";

export default {
  name: "D11Team",
  data: () => ({
    d11Team: null,
    season: null,
    d11TeamSeasonStat: null,
    playerSeasonStatsByPosition: null,
    d11MatchIds: null,
    tab: "squad"
  }),
  components: {
    D11Header: () => import("@/components/header/D11Header"),
    D11TeamImage: () => import("@/components/image/D11TeamImage"),
    ResultIndicator: () => import("@/components/ResultIndicator"),
    ContentSection: () => import("@/components/ContentSection"),
    PlayerSeasonStatsByPosition: () =>
      import("@/views/player_season_stat/PlayerSeasonStatsByPosition"),
    LazyD11MatchList: () => import("@/views/d11_match/LazyD11MatchList")
  },
  computed: {
    formMatchPoints() {
      var formMatchPoints = [];
      this.d11TeamSeasonStat.formMatchPoints.forEach(function(item, index) {
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
      D11TeamService.getD11TeamSeasonData(
        this.$route.params.id,
        this.$route.params.seasonId
      ).then(result => {
        this.d11Team = result.d11Team;
        this.season = result.season;
        this.d11TeamSeasonStat = result.d11TeamSeasonStat;
        this.d11MatchIds = result.d11MatchIds;
        this.playerSeasonStatsByPosition = null;
      });
    },
    findPlayerSeasonStats() {
      new this.$d11BootApi.PlayerSeasonStatApi()
        .findPlayerSeasonStatByD11TeamIdAndSeasonId(
          this.d11Team.id,
          this.season.id
        )
        .then(
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
        this.d11TeamSeasonStat == null ||
        this.$route.params.id != this.d11TeamSeasonStat.d11Team.id ||
        this.$route.params.seasonId != this.d11TeamSeasonStat.season.id
      ) {
        this.loadData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.d11-team-image {
  padding-right: $d11-spacer;
}

.d11-team-season-stats {
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
  .d11-team-season-stats {
    margin-top: unset;
    padding-right: unset;
  }
}
</style>
