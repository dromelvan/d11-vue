<template>
  <div class="player">
    <!-- Header -------------------------------->
    <d11-header
      :backgroundPictureType="'stadium'"
      :backgroundPictureId="19"
      :backgroundPictureAlt="'TODO'"
      :parentLink="parentLink"
      :previousLink="{
        name: 'player',
        params: {
          id: player ? player.id : 0,
          seasonId: season ? season.id - 1 : 0,
          tab: tab
        },
        show: season && season.id > minSeasonId()
      }"
      :nextLink="{
        name: 'player',
        params: {
          id: player ? player.id : 0,
          seasonId: season ? season.id + 1 : 0,
          tab: tab
        },
        show: season && season.id < maxSeasonId()
      }"
    >
      <template v-if="player && season">
        <div class="header-title">
          <h1>{{ player.name }}</h1>
          <edit-player-dialog
            :editPlayer="player"
            :playerSeasonStat="playerSeasonStat"
            @player-updated="loadData"
            v-if="administrator"
          />
          <create-transfer-dialog
            :player="player"
            :playerSeasonStat="playerSeasonStat"
            v-if="administrator"
          />

          <div class="external-link" v-if="smAndUp">
            <a
              class="team-link"
              target="_blank"
              :href="
                'https://www.whoscored.com/Players/' + player.whoscoredId + '/'
              "
            >
              View on Whoscored
            </a>
            <v-icon medium class="mdi-icon">mdi-chevron-right</v-icon>
          </div>
        </div>
        <div class="header-subtitle">
          <h4>Season {{ season.name }}</h4>
        </div>
        <div class="horizontal">
          <div class="player-image" v-if="smAndUp">
            <player-image :size="'large'" :fileName="player.photoFileName" />
          </div>

          <div class="player-season-stats" v-if="playerSeasonStat">
            <div class="points-ranking">
              <span class="points">{{ playerSeasonStat.points }}</span>
              pts
              <span class="ranking">#{{ playerSeasonStat.ranking }}</span>
              ranking
            </div>
            <div class="team" v-if="!playerSeasonStat.team.dummy">
              <team-image :size="'tiny'" :id="playerSeasonStat.team.id" />
              {{ teamName(playerSeasonStat.team, 20) }}
            </div>
            <div class="d11-team" v-if="!playerSeasonStat.d11Team.dummy">
              <d11-team-image
                :size="'tiny'"
                :id="playerSeasonStat.d11Team.id"
              />
              {{ playerSeasonStat.d11Team.name }}
            </div>
            <div class="rating-mom" v-if="smAndUp">
              {{ playerRating(playerSeasonStat.rating) }} avg rating
              <template
                v-if="
                  playerSeasonStat.manOfTheMatch > 0 ||
                    playerSeasonStat.sharedManOfTheMatch > 0
                "
              >
                -
                <template v-if="playerSeasonStat.sharedManOfTheMatch > 0">
                  {{ playerSeasonStat.manOfTheMatch }}/{{
                    playerSeasonStat.sharedManOfTheMatch
                  }}
                </template>
                <template v-else>
                  {{ playerSeasonStat.manOfTheMatch }}
                </template>
                MoM
              </template>
            </div>
            <div class="goals" v-if="smAndUp">
              {{ playerSeasonStat.goals }} goals,
              {{ playerSeasonStat.goalAssists }} assists
            </div>
            <div class="cards" v-if="smAndUp">
              <yellow-card-icon />
              {{ playerSeasonStat.yellowCards }}
              <red-card-icon />
              {{ playerSeasonStat.redCards }}
            </div>
            <div class="appearances" v-if="smAndUp">
              {{ playerSeasonStat.gamesStarted }}
              {{ playerSeasonStat.gamesStarted | pluralize("start") }},
              {{ playerSeasonStat.substitutionsOn }}
              {{ playerSeasonStat.substitutionsOn | pluralize("sub") }}
            </div>
          </div>

          <div class="player-info">
            <div class="date-of-birth" v-if="player.dateOfBirth && smAndUp">
              Born {{ player.dateOfBirth | moment("MMMM Do YYYY") }}
            </div>
            <div class="age" v-if="player.dateOfBirth && smAndUp">
              {{ playerAge(player.dateOfBirth) }} old
            </div>
            <div class="country" v-if="smAndUp">
              <country-image :size="'tiny'" :iso="player.country.iso" />
              {{ player.country.name }}
            </div>
            <div
              class="value"
              v-if="playerSeasonStat && playerSeasonStat.value > 0"
            >
              Value £{{ playerValue(playerSeasonStat.value) }} million
            </div>
          </div>
        </div>
      </template>
    </d11-header>

    <content-section>
      <v-container class="tabs-container">
        <v-tabs v-model="tab">
          <v-tab class="matches-tab" href="#matches">
            <template v-if="season"> Matches {{ season.name }} </template>
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
              <div class="no-data" v-if="player">
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
    tab: "matches",
    player: null,
    season: null,
    playerSeasonStat: null,
    playerMatchStats: null,
    playerSeasonStats: null
  }),
  components: {
    D11Header: () => import("@/components/header/D11Header"),
    PlayerImage: () => import("@/components/image/PlayerImage"),
    TeamImage: () => import("@/components/image/TeamImage"),
    D11TeamImage: () => import("@/components/image/D11TeamImage"),
    CountryImage: () => import("@/components/image/CountryImage"),
    YellowCardIcon: () => import("@/components/match_event/YellowCardIcon"),
    RedCardIcon: () => import("@/components/match_event/RedCardIcon"),
    ContentSection: () => import("@/components/ContentSection"),
    PlayerMatchStats: () => import("@/views/player_stat/PlayerMatchStats"),
    LazyPlayerSeasonStatList: () =>
      import("@/views/player_season_stat/LazyPlayerSeasonStatList"),
    EditPlayerDialog: () => import("@/views/admin/EditPlayerDialog"),
    CreateTransferDialog: () => import("@/views/admin/CreateTransferDialog")
  },
  computed: {
    parentLink() {
      if (this.$route.params.parentLink) {
        return this.$route.params.parentLink;
      } else {
        return {
          text: this.season ? "Season " + this.season.name : "",
          name: "season",
          params: { id: this.season ? this.season.id : 0 }
        };
      }
    }
  },
  methods: {
    loadData: function() {
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
    this.tab = this.$route.params.tab;
    this.loadData();
  },
  watch: {
    $route() {
      if (
        this.playerSeasonStat == null ||
        this.$route.params.id != this.player.id ||
        this.$route.params.seasonId != this.season.id
      ) {
        this.loadData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.player-image {
  min-width: 200px;
}

.player-image {
  padding-right: $d11-spacer;
}

.player-season-stats {
  margin-top: -0.4em;
  padding-right: 24px;

  .points {
    font-size: 2em;
  }

  .ranking {
    font-size: 1.8em;
  }
}
.team,
.d11-team,
.country {
  line-height: 32px;
  white-space: nowrap;
  img {
    padding-right: $d11-spacer;
  }
}

.v-application-xs {
  .player-season-stats {
    margin-top: unset;
    padding-right: unset;
  }
}
</style>
