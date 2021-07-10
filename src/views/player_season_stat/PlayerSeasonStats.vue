<template>
  <div class="player-season-stats" v-if="season">
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
        name: 'playerSeasonStats',
        params: {
          seasonId: season ? season.id - 1 : 0,
          tab: tab
        },
        show: season && season.id > minSeasonId()
      }"
      :nextLink="{
        name: 'playerSeasonStats',
        params: {
          seasonId: season ? season.id + 1 : 0,
          tab: tab
        },
        show: season && season.id < maxSeasonId()
      }"
    >
      <template v-if="season">
        <div class="header-title">
          <h1>Player Stats</h1>
        </div>
        <div class="header-subtitle">
          <h4>Season {{ season.name }}</h4>
        </div>

        <div class="horizontal most-valuable-player">
          <div class="player-image">
            <player-image
              :size="'large'"
              :fileName="
                seasonSummary.top3PlayerSeasonStats[0].player.photoFileName
              "
            />
          </div>
          <div class="player-season-stats">
            <div class="player-name">
              <h3>{{ seasonSummary.top3PlayerSeasonStats[0].player.name }}</h3>
            </div>
            <div class="points-ranking">
              <span class="points">{{
                seasonSummary.top3PlayerSeasonStats[0].points
              }}</span>
              pts
              <span class="ranking"
                >#{{ seasonSummary.top3PlayerSeasonStats[0].ranking }}</span
              >
              ranking
            </div>
            <div v-if="finished(season.status)">
              {{
                seasonSummary.top3PlayerSeasonStats[0].winCount
                  | ordinal({ includeNumber: true })
              }}
              MvP award
            </div>
            <div
              class="team"
              v-if="!seasonSummary.top3PlayerSeasonStats[0].team.dummy"
            >
              <team-image
                :size="'tiny'"
                :id="seasonSummary.top3PlayerSeasonStats[0].team.id"
              />
              {{ teamName(seasonSummary.top3PlayerSeasonStats[0].team, 20) }}
            </div>
            <div
              class="d11-team"
              v-if="!seasonSummary.top3PlayerSeasonStats[0].d11Team.dummy"
            >
              <d11-team-image
                :size="'tiny'"
                :id="seasonSummary.top3PlayerSeasonStats[0].d11Team.id"
              />
              {{ seasonSummary.top3PlayerSeasonStats[0].d11Team.name }}
            </div>
          </div>

          <div class="runners-up">
            <div class="runner-up">
              <div class="horizontal">
                <team-image
                  :size="'tiny'"
                  :id="seasonSummary.top3PlayerSeasonStats[1].team.id"
                />
                <h3>
                  {{ seasonSummary.top3PlayerSeasonStats[1].player.name }}
                </h3>
              </div>
              <div class="points-ranking">
                <span class="points">{{
                  seasonSummary.top3PlayerSeasonStats[1].points
                }}</span>
                pts
                <span class="ranking"
                  >#{{ seasonSummary.top3PlayerSeasonStats[1].ranking }}</span
                >
                ranking
              </div>
              <div
                class="d11-team"
                v-if="!seasonSummary.top3PlayerSeasonStats[1].d11Team.dummy"
              >
                <d11-team-image
                  :size="'tiny'"
                  :id="seasonSummary.top3PlayerSeasonStats[1].d11Team.id"
                />
                {{ seasonSummary.top3PlayerSeasonStats[1].d11Team.name }}
              </div>
            </div>
            <div class="runner-up">
              <div class="horizontal">
                <team-image
                  :size="'tiny'"
                  :id="seasonSummary.top3PlayerSeasonStats[2].team.id"
                />
                <h3>
                  {{ seasonSummary.top3PlayerSeasonStats[2].player.name }}
                </h3>
              </div>
              <div class="points-ranking">
                <span class="points">{{
                  seasonSummary.top3PlayerSeasonStats[2].points
                }}</span>
                pts
                <span class="ranking"
                  >#{{ seasonSummary.top3PlayerSeasonStats[2].ranking }}</span
                >
                ranking
              </div>
              <div
                class="d11-team"
                v-if="!seasonSummary.top3PlayerSeasonStats[2].d11Team.dummy"
              >
                <d11-team-image
                  :size="'tiny'"
                  :id="seasonSummary.top3PlayerSeasonStats[2].d11Team.id"
                />
                {{ seasonSummary.top3PlayerSeasonStats[2].d11Team.name }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </d11-header>

    <!-- <player-season-stats-overview-sm-and-up v-if="smAndUp" :season="season" /> -->

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
    seasonSummary: null,
    page: 1,
    playerSeasonStats: null
  }),
  components: {
    //    PlayerSeasonStatsOverviewSmAndUp: () =>
    //      import("@/views/player_season_stat/PlayerSeasonStatsOverviewSmAndUp"),
    D11Header: () => import("@/components/header/D11Header"),
    PlayerImage: () => import("@/components/image/PlayerImage"),
    TeamImage: () => import("@/components/image/TeamImage"),
    D11TeamImage: () => import("@/components/image/D11TeamImage"),
    ContentSection: () => import("@/components/ContentSection"),
    LazyPlayerSeasonStatList: () =>
      import("@/views/player_season_stat/LazyPlayerSeasonStatList")
  },
  methods: {
    loadData: function() {
      SeasonService.getSeasonData(this.$route.params.seasonId).then(result => {
        (this.season = result.season),
          (this.seasonSummary = result.seasonSummary);
      });
    },
    getPlayerSeasonStats: function() {
      PlayerSeasonStatService.getPlayerSeasonStatsBySeasonIdAndPage(
        this.$route.params.seasonId,
        this.page - 1
      ).then(result => (this.playerSeasonStats = result));
    }
  },
  mounted() {
    this.loadData();
  },
  watch: {
    $route() {
      this.playerSeasonStats = null;
      this.page = 1;
      this.loadData();
      this.getPlayerSeasonStats();
    },
    page() {
      this.playerSeasonStats = null;
      this.getPlayerSeasonStats();
    }
  }
};
</script>

<style lang="scss" scoped>
.player-image.large {
  min-width: 200px;
}

.player-image.large {
  padding-right: $d11-spacer;
}

.most-valuable-player {
  .player-season-stats {
    padding-right: 24px;

    span.points {
      font-size: 2em;
    }

    span.ranking {
      font-size: 1.8em;
    }
  }
}

.runners-up {
  .player-image {
    margin-top: -0.4em;
  }

  .points {
    font-size: 1.5em;
  }

  .ranking {
    font-size: 1.4em;
  }

  .runner-up + .runner-up {
    margin-top: $d11-large-spacer;
  }
}
</style>
