<template>
  <div class="match-day" v-if="matchWeek">
    <d11-header
      :backgroundPictureType="'stadium'"
      :backgroundPictureId="19"
      :backgroundPictureAlt="'TODO'"
      :parentLink="{
        text: 'Season ' + matchWeek.season.name,
        name: 'season',
        params: { id: matchWeek.season.id }
      }"
      :previousLink="{
        name: 'matchWeek',
        params: { id: matchWeek.id - 1, tab: tab }
      }"
      :nextLink="{
        name: 'matchWeek',
        params: { id: matchWeek.id + 1, tab: tab }
      }"
    >
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
    </d11-header>

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
            <v-tab-item value="matches">
              <lazy-match-list
                v-for="date in Object.keys(matchWeek.matches)"
                :key="date"
                :date="date"
                :matchIds="matchWeek.matches[date]"
              />
            </v-tab-item>
            <v-tab-item value="d11-matches">
              <lazy-d11-match-list
                v-for="date in Object.keys(matchWeek.d11Matches)"
                :key="date"
                :date="date"
                :d11MatchIds="matchWeek.d11Matches[date]"
              />
            </v-tab-item>
            <v-tab-item value="stats">
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
    getMatchWeek: function() {
      new this.$d11BootApi.MatchWeekApi()
        .findMatchWeekById(this.$route.params.id)
        .then(result => (this.matchWeek = result));
    }
  },
  mounted() {
    this.getMatchWeek();
  },
  watch: {
    $route() {
      this.getMatchWeek();
    }
  }
};
</script>

<style lang="scss" scoped>
.emphasised {
  min-width: 10em;
}
</style>
