<template>
  <div class="d11-team" v-if="d11Team && season">
    <d11-team-overview-sm-and-up
      v-if="smAndUp"
      :d11Team="d11Team"
      :season="season"
      :d11TeamSeasonStat="d11TeamSeasonStat"
    />

    <content-section>
      <v-container class="tabs-container">
        <v-tabs v-model="tab">
          <v-tab class="squad-tab" href="#squad">
            Team Squad {{ season.name }}
          </v-tab>
          <v-tab class="matches-tab" href="#matches">
            Matches {{ season.name }}
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
              <div class="no-data">
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
              <div class="no-data">
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
export default {
  name: "D11Team",
  data: () => ({
    d11Team: null,
    season: null,
    d11TeamSeasonStat: null,
    playerSeasonStatsByPosition: null,
    d11MatchIds: null
  }),
  components: {
    D11TeamOverviewSmAndUp: () =>
      import("@/views/d11_team/D11TeamOverviewSmAndUp"),
    ContentSection: () => import("@/components/ContentSection"),
    PlayerSeasonStatsByPosition: () =>
      import("@/views/player_season_stat/PlayerSeasonStatsByPosition"),
    LazyD11MatchList: () => import("@/views/d11_match/LazyD11MatchList")
  },
  computed: {
    tab: {
      set(tab) {
        this.$router.replace({ params: { ...this.$route.params.tab, tab } });
      },
      get() {
        return this.$route.params.tab;
      }
    }
  },
  methods: {
    getData: function() {
      new this.$d11BootApi.D11TeamApi()
        .findD11TeamById(this.$route.params.id)
        .then(d11Team => {
          this.d11Team = d11Team;
          new this.$d11BootApi.SeasonApi()
            .findSeasonById(this.$route.params.seasonId)
            .then(season => {
              this.season = season;
              this.playerSeasonStatsByPosition = null;
              new this.$d11BootApi.D11TeamSeasonStatApi()
                .findD11TeamSeasonStatByD11TeamIdAndSeasonId(
                  this.$route.params.id,
                  this.$route.params.seasonId
                )
                .then(result => {
                  this.d11TeamSeasonStat = result;
                })
                .catch(error => {
                  this.d11TeamSeasonStat = null;
                  // If this is a 404 it just means we're trying to look at D11 team season stats
                  // for a season where the D11 team didn't participate in the D11 league. Just ignore.
                  if (error.status != 404) {
                    throw error;
                  }
                });

              this.d11MatchIds = null;
              new this.$d11BootApi.D11MatchApi()
                .findD11MatchByD11TeamIdAndSeasonId(
                  this.$route.params.id,
                  this.$route.params.seasonId
                )
                .then(result => {
                  this.d11MatchIds = result;
                })
                .catch(error => {
                  this.d11TeamSeasonStat = null;
                  if (error.status != 404) {
                    throw error;
                  }
                });
            });
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
    this.getData();
  },
  watch: {
    $route() {
      if (
        this.d11TeamSeasonStat == null ||
        this.$route.params.id != this.d11TeamSeasonStat.d11Team.id ||
        this.$route.params.seasonId != this.d11TeamSeasonStat.season.id
      ) {
        this.getData();
      }
    }
  }
};
</script>
