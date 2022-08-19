<template>
  <div class="player-season-stats">
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
        show: !season || season.id > minSeasonId()
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
      <template>
        <div class="header-title">
          <h1>Player Stats</h1>
        </div>
        <div class="header-subtitle" v-if="season">
          <h4>Season {{ season.name }}</h4>
        </div>

        <div
          class="horizontal most-valuable-player"
          v-if="
            smAndUp &&
              seasonSummary &&
              seasonSummary.top3PlayerSeasonStats.length >= 3
          "
        >
          <div class="player-image" v-if="seasonSummary">
            <player-image
              :size="'large'"
              :fileName="
                seasonSummary.top3PlayerSeasonStats[0].player.photoFileName
              "
            />
          </div>
          <div class="player-season-stats" v-if="season && seasonSummary">
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

          <div class="runners-up" v-if="seasonSummary">
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

    <content-section>
      <v-container class="tabs-container">
        <v-tabs v-model="tab">
          <v-tab class="stats-tab" href="#stats">
            <template v-if="season"> Player Stats {{ season.name }} </template>
          </v-tab>
          <v-tabs-items :value="tab">
            <v-tab-item value="stats" v-if="season">
              <div class="top-pagination">
                <v-pagination
                  v-model="page"
                  :length="Math.ceil(season.playerSeasonStatCount / 25)"
                  :total-visible="totalVisible"
                />

                <!-- Filter menu -------------------------------------------------------------------->
                <v-menu bottom left offset-y :close-on-content-click="false">
                  <template v-slot:activator="{ on: menu, attrs }">
                    <v-tooltip top>
                      <template v-slot:activator="{ on: tooltip }">
                        <v-btn
                          class="filter-btn"
                          style="background-color: rgba(0,0,0,0) !important; min-width: unset !important"
                          elevation="0"
                          v-bind="attrs"
                          v-on="{ ...tooltip, ...menu }"
                        >
                          <v-icon dark>
                            mdi-cog
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Filter player stat list</span>
                    </v-tooltip>
                  </template>

                  <v-list class="filter-list" dense>
                    <v-subheader>AVAILABILITY</v-subheader>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-checkbox
                            v-model="filter.unavailable"
                            label="Unavailable"
                            :ripple="false"
                            hide-details
                          />
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-checkbox
                            v-model="filter.available"
                            label="Available"
                            :ripple="false"
                            hide-details
                          />
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-subheader>POSITION</v-subheader>
                    <v-list-item
                      v-for="position in this.positions"
                      :key="position.id"
                    >
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-checkbox
                            v-model="filter.positionIds"
                            :value="position.id"
                            :label="position.name"
                            :ripple="false"
                            hide-details
                          />
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>

              <!-- Player season stat list -------------------------------------------------------->
              <lazy-player-season-stat-list
                :context="'Player'"
                :playerSeasonStats="playerSeasonStats"
                view="players"
                @findPlayerSeasonStats="getPlayerSeasonStats"
              />

              <!-- Bottom pagination -------------------------------------------------------------->
              <v-pagination
                v-model="page"
                :length="Math.ceil(season.playerSeasonStatCount / 25)"
                :total-visible="13"
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
import PositionService from "@/services/position.service";

export default {
  name: "PlayerSeasonStats",
  data: () => ({
    season: null,
    seasonSummary: null,
    page: 1,
    playerSeasonStats: null,
    tab: "stats",
    positions: [],
    filter: {
      available: true,
      unavailable: true,
      positionIds: []
    }
  }),
  components: {
    D11Header: () => import("@/components/header/D11Header"),
    PlayerImage: () => import("@/components/image/PlayerImage"),
    TeamImage: () => import("@/components/image/TeamImage"),
    D11TeamImage: () => import("@/components/image/D11TeamImage"),
    ContentSection: () => import("@/components/ContentSection"),
    LazyPlayerSeasonStatList: () =>
      import("@/views/player_season_stat/LazyPlayerSeasonStatList")
  },
  computed: {
    totalVisible: function() {
      if (this.xs) {
        return 3;
      } else {
        return 13;
      }
    }
  },
  methods: {
    loadData: function() {
      let seasonId =
        this.$route.params.seasonId === "current"
          ? this.currentSeason().id
          : this.$route.params.seasonId;
      SeasonService.getSeasonData(seasonId).then(result => {
        (this.season = result.season),
          (this.seasonSummary = result.seasonSummary);
      });
      PositionService.getPositions().then(result => {
        result.pop();
        this.positions = result;
        this.filter.positionIds = result.map(position => position.id);
      });
    },
    getPlayerSeasonStats: function() {
      let seasonId =
        this.$route.params.seasonId === "current"
          ? this.currentSeason().id
          : this.$route.params.seasonId;
      PlayerSeasonStatService.getPlayerSeasonStatsBySeasonIdAndPage(
        seasonId,
        this.page - 1,
        this.filter
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
    },
    filter: {
      handler() {
        this.playerSeasonStats = null;
        this.getPlayerSeasonStats();
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.top-pagination {
  .filter-btn {
    position: absolute;
    right: 12px;
    top: 0px;
    width: 50px;
  }
}

.v-application-xs {
  .top-pagination {
    .filter-btn {
      position: absolute;
      right: 0px;
      top: 0px;
    }
  }

  .v-btn__content {
    align-items: right;
  }
}

.filter-list {
  .v-input--selection-controls {
    margin-top: unset;
  }
}

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

.v-menu__content {
  .v-list--dense .v-subheader {
    color: rgba(0, 0, 0, 0.87);
    line-height: 2.2em;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 0px;
    margin-left: $d11-spacer;
    height: 30px;
  }
}
</style>
