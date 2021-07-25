<template>
  <div class="season">
    <!-- Header -------------------------------->
    <d11-header
      :backgroundPictureType="'stadium'"
      :backgroundPictureId="19"
      :backgroundPictureAlt="'TODO'"
      :parentLink="{
        text: 'Season History',
        name: 'seasons'
      }"
      :previousLink="{
        name: 'season',
        params: {
          id: season ? season.id - 1 : 0,
          tab: tab
        },
        show: season && season.id > minSeasonId()
      }"
      :nextLink="{
        name: 'season',
        params: {
          id: season ? season.id + 1 : 0,
          tab: tab
        },
        show: season && season.id < maxSeasonId()
      }"
    >
      <template v-if="season">
        <div class="header-title">
          <h1>Season</h1>
        </div>
        <div class="header-subtitle">
          <h4>{{ season.name }}</h4>
        </div>

        <div class="horizontal">
          <div class="season-summary" v-if="seasonSummary">
            <div class="horizontal most-valuable-player" v-if="seasonSummary">
              <div class="description">
                Most valuable player:
              </div>
              <div>
                <team-image
                  :size="'tiny'"
                  :id="seasonSummary.top3PlayerSeasonStats[0].team.id"
                />
                {{ seasonSummary.top3PlayerSeasonStats[0].player.name }}
                <template
                  v-if="seasonSummary.top3PlayerSeasonStats[0].d11Team.id > 1"
                >
                  ({{ seasonSummary.top3PlayerSeasonStats[0].d11Team.name }})
                </template>
                {{ seasonSummary.top3PlayerSeasonStats[0].points }} pts
                <template v-if="finished(season.status)">
                  -
                  {{
                    seasonSummary.top3PlayerSeasonStats[0].winCount
                      | ordinal({ includeNumber: true })
                  }}
                  win
                </template>
              </div>
            </div>

            <div class="horizontal premier-league-winner">
              <div class="description">
                Premier league
                <template v-if="finished(season.status)">winner:</template>
                <template v-else>leader:</template>
              </div>
              <div>
                <team-image
                  :size="'tiny'"
                  :id="seasonSummary.top3TeamSeasonStats[0].team.id"
                />
                {{ seasonSummary.top3TeamSeasonStats[0].team.name }}
                {{ seasonSummary.top3TeamSeasonStats[0].points }} pts
                <template v-if="finished(season.status)">
                  -
                  {{
                    seasonSummary.top3TeamSeasonStats[0].winCount
                      | ordinal({ includeNumber: true })
                  }}
                  victory
                </template>
              </div>
            </div>

            <div class="horizontal d11-league-winner">
              <div class="description">
                D11 league
                <template v-if="finished(season.status)">winner:</template>
                <template v-else>leader:</template>
              </div>
              <div>
                <d11-team-image
                  :size="'tiny'"
                  :id="seasonSummary.top3D11TeamSeasonStats[0].d11Team.id"
                />
                {{ seasonSummary.top3D11TeamSeasonStats[0].d11Team.name }}
                {{ seasonSummary.top3D11TeamSeasonStats[0].points }} pts
                <template v-if="finished(season.status)">
                  -
                  {{
                    seasonSummary.top3D11TeamSeasonStats[0].winCount
                      | ordinal({ includeNumber: true })
                  }}
                  victory
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>
    </d11-header>

    <!-- Content -------------------------------->
    <content-section>
      <v-container class="tabs-container">
        <v-tabs v-model="tab">
          <v-tab class="match-weeks-tab" href="#match-weeks">
            Match Weeks
          </v-tab>
          <v-tab class="premier-league-table-tab" href="#premier-league-table">
            Premier League Table
          </v-tab>
          <v-tab class="d11-league-table-tab" href="#d11-league-table">
            D11 League Table
          </v-tab>
          <v-tabs-items :value="tab">
            <v-tab-item value="match-weeks" v-if="season">
              <lazy-match-week-list
                v-for="season in [this.season]"
                :key="season.id"
                :matchWeekIds="season.matchWeeks"
              />
            </v-tab-item>
            <v-tab-item value="premier-league-table" v-if="season">
              <premier-league-table
                v-for="season in [this.season]"
                :key="season.id"
                :seasonId="season.id"
              />
            </v-tab-item>
            <v-tab-item value="d11-league-table" v-if="season">
              <d11-league-table
                v-for="season in [this.season]"
                :key="season.id"
                :seasonId="season.id"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-container>
    </content-section>
  </div>
</template>

<script>
import SeasonService from "@/services/season.service";

export default {
  name: "Season",
  data: () => ({
    season: null,
    seasonSummary: null,
    tab: "match-weeks"
  }),
  components: {
    D11Header: () => import("@/components/header/D11Header"),
    TeamImage: () => import("@/components/image/TeamImage"),
    D11TeamImage: () => import("@/components/image/D11TeamImage"),
    ContentSection: () => import("@/components/ContentSection"),
    LazyMatchWeekList: () => import("@/views/match_week/LazyMatchWeekList"),
    PremierLeagueTable: () =>
      import("@/views/premier_league/PremierLeagueTable"),
    D11LeagueTable: () => import("@/views/d11_league/D11LeagueTable")
  },
  methods: {
    loadData: function() {
      let id =
        this.$route.params.id === "current"
          ? this.currentSeason().id
          : this.$route.params.id;
      SeasonService.getSeasonData(id).then(result => {
        (this.season = result.season),
          (this.seasonSummary = result.seasonSummary);
      });
    }
  },
  mounted() {
    this.tab = this.$route.params.tab;
    this.loadData();
  },
  watch: {
    $route() {
      this.tab = this.$route.params.tab;
      this.loadData();
    }
  }
};
</script>

<style lang="scss" scoped>
.description {
  min-width: 10em;
}
.horizontal {
  line-height: 2em;
}
</style>
