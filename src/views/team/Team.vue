<template>
  <div class="match" v-if="team && season">
    <team-overview-sm-and-up
      v-if="smAndUp"
      :team="team"
      :season="season"
      :teamSeasonStat="teamSeasonStat"
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
              <div class="no-data">
                {{ team.name }} did not participate in the
                {{ season.name }} season.
              </div>
            </v-tab-item>
            <v-tab-item value="matches" v-if="teamSeasonStat">
              Matches
            </v-tab-item>
            <v-tab-item value="matches" v-else>
              <div class="no-data">
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
export default {
  name: "Team",
  data: () => ({
    team: null,
    season: null,
    teamSeasonStat: null,
    playerSeasonStatsByPosition: null
  }),
  components: {
    TeamOverviewSmAndUp: () => import("@/views/team/TeamOverviewSmAndUp"),
    ContentSection: () => import("@/components/ContentSection"),
    PlayerSeasonStatsByPosition: () =>
      import("@/views/player_season_stat/PlayerSeasonStatsByPosition")
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
      new this.$d11BootApi.TeamApi()
        .findTeamById(this.$route.params.id)
        .then(team => {
          this.team = team;
          new this.$d11BootApi.SeasonApi()
            .findSeasonById(this.$route.params.seasonId)
            .then(season => {
              this.season = season;
              this.playerSeasonStatsByPosition = null;
              new this.$d11BootApi.TeamSeasonStatApi()
                .findTeamSeasonStatByTeamIdAndSeasonId(
                  this.$route.params.id,
                  this.$route.params.seasonId
                )
                .then(result => {
                  this.teamSeasonStat = result;
                })
                .catch(error => {
                  this.teamSeasonStat = null;
                  // If this is a 404 it just means we're trying to look at team season stats
                  // for a season where the team didn't participate in the Premier League. Just ignore.
                  if (error.status != 404) {
                    throw error;
                  }
                });
            });
        });
    },
    findPlayerSeasonStats() {
      new this.$d11BootApi.PlayerSeasonStatApi()
        .findPlayerSeasonStatByTeamIdAndSeasonId(this.team.id, this.season.id)
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
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
.no-data {
  padding-top: $d11-spacer;
}
</style>
