<template>
  <div class="player" v-if="player && season">
    <player-overview-sm-and-up
      v-if="smAndUp"
      :player="player"
      :season="season"
      :playerSeasonStat="playerSeasonStat"
    />

    <content-section>
      <v-container class="tabs-container">
        <v-tabs v-model="tab">
          <v-tab class="matches-tab" href="#matches">
            Matches {{ season.name }}
          </v-tab>
          <v-tab class="seasons-tab" href="#seasons">
            Season History
          </v-tab>
          <v-tabs-items :value="tab">
            <v-tab-item value="matches" v-if="playerSeasonStat">
              <player-match-stats
                v-for="player in [this.player]"
                :key="player.id"
                :findPlayerMatchStatParams="{
                  playerId: player.id,
                  seasonId: season.id
                }"
                :playerMatchStats="playerMatchStats"
                view="player"
                @getPlayerMatchStats="getPlayerMatchStats"
              />
            </v-tab-item>
            <v-tab-item value="matches" v-else>
              <div class="no-data">
                {{ player.name }} did not participate in the
                {{ season.name }} season.
              </div>
            </v-tab-item>
            <v-tab-item value="seasons">
              <lazy-player-season-stat-list
                :playerSeasonStats="playerSeasonStats"
                view="player"
                @findPlayerSeasonStats="getPlayerSeasonStats"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-container>
    </content-section>
  </div>
</template>

<script>
import PlayerService from "@/services/player.service";
import PlayerSeasonStatService from "@/services/playerSeasonStat.service";

export default {
  name: "Player",
  data: () => ({
    player: null,
    season: null,
    playerSeasonStat: null,
    playerMatchStats: null,
    playerSeasonStats: null
  }),
  components: {
    PlayerOverviewSmAndUp: () => import("@/views/player/PlayerOverviewSmAndUp"),
    ContentSection: () => import("@/components/ContentSection"),
    PlayerMatchStats: () => import("@/views/player_stat/PlayerMatchStats"),
    LazyPlayerSeasonStatList: () =>
      import("@/views/player_season_stat/LazyPlayerSeasonStatList")
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
      this.playerMatchStats = null;
      PlayerService.getPlayerSeasonData(
        this.$route.params.id,
        this.$route.params.seasonId
      ).then(result => {
        this.player = result.player;
        this.season = result.season;
        this.playerSeasonStat = result.playerSeasonStat;
      });
    },
    getPlayerMatchStats: function() {
      PlayerService.getPlayerMatchStats(
        this.$route.params.id,
        this.$route.params.seasonId
      ).then(result => (this.playerMatchStats = result));
    },
    getPlayerSeasonStats: function() {
      PlayerSeasonStatService.getPlayerSeasonStatsByPlayerId(
        this.player.id
      ).then(result => (this.playerSeasonStats = result));
    }
  },
  mounted() {
    this.getData();
  },
  watch: {
    $route() {
      if (
        this.playerSeasonStat == null ||
        this.$route.params.id != this.player.id ||
        this.$route.params.seasonId != this.season.id
      ) {
        this.getData();
      }
    }
  }
};
</script>
