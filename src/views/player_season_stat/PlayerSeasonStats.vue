<template>
  <div class="player-season-stats" v-if="season">
    <player-season-stats-overview-sm-and-up v-if="smAndUp" :season="season" />

    <content-section>
      <v-container class="tabs-container">
        <v-tabs v-model="tab">
          <v-tab class="stats-tab" href="#stats">
            Player Stats {{ season.name }}
          </v-tab>
          <v-tabs-items :value="tab">
            <v-tab-item value="stats">
              <v-pagination
                v-model="page"
                :length="Math.ceil(season.playerSeasonStatCount / 25)"
                :total-visible="15"
              />

              <lazy-player-season-stat-list
                :context="'Player'"
                :playerSeasonStats="playerSeasonStats"
                view="team"
                @findPlayerSeasonStats="getPlayerSeasonStats"
              />

              <v-pagination
                v-model="page"
                :length="Math.ceil(season.playerSeasonStatCount / 25)"
                :total-visible="15"
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
import PlayerSeasonStatService from "@/services/playerSeasonStat.service";

export default {
  name: "PlayerSeasonStats",
  data: () => ({
    season: null,
    page: 1,
    playerSeasonStats: null
  }),
  components: {
    PlayerSeasonStatsOverviewSmAndUp: () =>
      import("@/views/player_season_stat/PlayerSeasonStatsOverviewSmAndUp"),
    ContentSection: () => import("@/components/ContentSection"),
    LazyPlayerSeasonStatList: () =>
      import("@/views/player_season_stat/LazyPlayerSeasonStatList")
  },
  methods: {
    getSeason: function() {
      SeasonService.getSeason(this.$route.params.seasonId).then(result => {
        this.season = result;
      });
    },
    getPlayerSeasonStats: function() {
      PlayerSeasonStatService.getPlayerSeasonStatsBySeasonIdAndPage(
        this.$route.params.seasonId,
        this.page - 1
      ).then(result => (this.playerSeasonStats = result));
    }
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
  mounted() {
    this.getSeason();
  },
  watch: {
    $route() {
      this.playerSeasonStats = null;
      this.page = 1;
      this.getSeason();
      this.getPlayerSeasonStats();
    },
    page() {
      this.playerSeasonStats = null;
      this.getPlayerSeasonStats();
    }
  }
};
</script>
