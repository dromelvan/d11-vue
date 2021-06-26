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
            Season Stats
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
              Season stats
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-container>
    </content-section>
  </div>
</template>

<script>
import PlayerService from "@/services/player.service";
export default {
  name: "Player",
  data: () => ({
    player: null,
    season: null,
    playerSeasonStat: null,
    playerMatchStats: null
  }),
  components: {
    PlayerOverviewSmAndUp: () => import("@/views/player/PlayerOverviewSmAndUp"),
    ContentSection: () => import("@/components/ContentSection"),
    PlayerMatchStats: () => import("@/views/player_stat/PlayerMatchStats")
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
      PlayerService.getPlayerSeasonData(
        this.$route.params.id,
        this.$route.params.seasonId
      ).then(result => {
        this.player = result.player;
        this.season = result.season;
        this.playerSeasonStat = result.playerSeasonStat;
        this.playerMatchStats = null;
      });
    },
    getPlayerMatchStats: function() {
      PlayerService.getPlayerMatchStats(this.player.id, this.season.id).then(
        result => (this.playerMatchStats = result)
      );
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
