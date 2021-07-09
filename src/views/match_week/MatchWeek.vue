<template>
  <div class="match-day">
    <!-- Header -------------------------------->
    <d11-header
      :backgroundPictureType="'stadium'"
      :backgroundPictureId="19"
      :backgroundPictureAlt="'TODO'"
      :parentLink="{
        text: matchWeek ? 'Season ' + matchWeek.season.name : '',
        name: 'season',
        params: { id: matchWeek ? matchWeek.season.id : 0 }
      }"
      :previousLink="{
        name: 'matchWeek',
        params: { id: matchWeek ? matchWeek.id - 1 : 0, tab: tab },
        show: matchWeek && matchWeek.id > 1
      }"
      :nextLink="{
        name: 'matchWeek',
        params: { id: matchWeek ? matchWeek.id + 1 : 0, tab: tab },
        show: matchWeek
      }"
    >
      <template v-if="matchWeek">
        <div class="header-title">
          <h1>Match Week {{ matchWeek.matchWeekNumber }}</h1>
        </div>
        <div class="header-subtitle">
          <h4>Season {{ matchWeek.season.name }}</h4>
        </div>

        <div class="active-message" v-if="this.active(matchWeek.status)">
          * This match week is active and results are not yet final.
        </div>

        <template v-if="!this.pending(matchWeek.status)">
          <div class="horizontal">
            <div class="emphasised">
              Most valuable player:
            </div>
            <div>
              <team-image
                :size="'icon'"
                :id="matchWeek.mostValuablePlayer.team.id"
              />
              {{ matchWeek.mostValuablePlayer.player.name }}
              <template v-if="matchWeek.mostValuablePlayer.d11Team.id > 1">
                ({{ matchWeek.mostValuablePlayer.d11Team.name }})
              </template>
              {{ matchWeek.mostValuablePlayer.points }} pts
            </div>
          </div>

          <div class="horizontal">
            <div class="emphasised">
              Premier League leader:
            </div>
            <div>
              <team-image
                :size="'icon'"
                :id="matchWeek.premierLeagueLeader.team.id"
              />
              {{ matchWeek.premierLeagueLeader.team.name }}
              {{ matchWeek.premierLeagueLeader.points }} pts
            </div>
          </div>

          <div class="horizontal">
            <div class="emphasised">
              D11 League leader:
            </div>
            <div>
              <d11-team-image
                :size="'icon'"
                :id="matchWeek.d11LeagueLeader.d11Team.id"
              />
              {{ matchWeek.d11LeagueLeader.d11Team.name }}
              {{ matchWeek.d11LeagueLeader.points }} pts
            </div>
          </div>
        </template>
      </template>
    </d11-header>

    <!-- Content -------------------------------->
    <content-section>
      <v-container class="tabs-container">
        <v-tabs v-model="tab">
          <v-tab class="matches-tab" href="#matches">
            Premier League Matches
          </v-tab>
          <v-tab class="matches-tab" href="#d11-matches">
            D11 Matches
          </v-tab>
          <v-tab class="stats-tab" href="#stats">
            Statistics
          </v-tab>
          <v-tabs-items :value="tab">
            <v-tab-item value="matches" v-if="matchWeek">
              <lazy-match-list
                v-for="date in Object.keys(matchWeek.matches)"
                :key="date"
                :date="date"
                :matchIds="matchWeek.matches[date]"
              />
            </v-tab-item>
            <v-tab-item value="d11-matches" v-if="matchWeek">
              <lazy-d11-match-list
                v-for="date in Object.keys(matchWeek.d11Matches)"
                :key="date"
                :date="date"
                :d11MatchIds="matchWeek.d11Matches[date]"
              />
            </v-tab-item>
            <v-tab-item value="stats" v-if="matchWeek">
              <!-- This hack with v-for resets the stats tab so it doesn't load stats on route change when it's not
                  the active tab. Some day we might want to figure out how to do it in a less hacky way. -->
              <match-week-stats
                :matchWeekId="matchWeek.id"
                v-for="matchWeek in [this.matchWeek]"
                :key="matchWeek.id"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-container>
    </content-section>
  </div>
</template>

<script>
import MatchWeekService from "@/services/matchWeek.service";

export default {
  name: "MatchWeek",
  data: () => ({
    matchWeek: null
  }),
  components: {
    D11Header: () => import("@/components/header/D11Header"),
    TeamImage: () => import("@/components/image/TeamImage"),
    D11TeamImage: () => import("@/components/image/D11TeamImage"),
    ContentSection: () => import("@/components/ContentSection"),
    LazyMatchList: () => import("@/views/match/LazyMatchList"),
    LazyD11MatchList: () => import("@/views/d11_match/LazyD11MatchList"),
    MatchWeekStats: () => import("@/views/match_week/MatchWeekStats")
  },
  methods: {
    loadData: function() {
      MatchWeekService.findMatchWeekById(this.$route.params.id).then(
        result => (this.matchWeek = result)
      );
    }
  },
  mounted() {
    this.loadData();
  },
  watch: {
    $route() {
      this.loadData();
    }
  }
};
</script>

<style lang="scss" scoped>
.emphasised {
  min-width: 10em;
}
</style>
