<template>
  <v-col md="3" sm="6" cols="12">
    <v-lazy
      class="d11-team-card-lazy"
      v-model="visible"
      :options="{ threshold: 0.5 }"
      transition="fade-transition"
    >
      <router-link
        :to="{
          name: 'd11Team',
          params: { id: d11Team.id, seasonId: season.id }
        }"
        class="v-card-link"
      >
        <v-card class="d11-team" outlined>
          <v-card-title>
            <v-img
              dark
              max-height="64px"
              src="@/assets/images/card-title-background.png"
            >
              <d11-team-image
                :type="'d11Team'"
                :size="'tiny'"
                :id="d11Team.id"
              />

              {{ d11Team.name }}
            </v-img>
          </v-card-title>
          <v-card-subtitle>
            <div class="position">Pos</div>
            <div class="player">Player</div>
            <div class="fee">Fee</div>
          </v-card-subtitle>
          <v-card-text
            v-for="playerSeasonStat in playerSeasonStats"
            :key="playerSeasonStat.id"
          >
            <div class="position">
              {{ playerSeasonStat.position.code }}
            </div>
            <div class="team-image">
              <team-image
                :type="'team'"
                :size="'tiny'"
                :id="playerSeasonStat.team.id"
              />
            </div>
            <div class="player">
              {{ playerName(playerSeasonStat.player, 17) }}
            </div>
            <div class="fee">
              {{ playerValue(playerSeasonStat.value) }}
            </div>
          </v-card-text>
          <v-card-subtitle>
            <div class="total">
              Total:
            </div>
            <div class="sum">
              {{ playerValue(total) }}
            </div>
          </v-card-subtitle>
        </v-card>
      </router-link>
    </v-lazy>
  </v-col>
</template>

<script>
import PlayerSeasonStatService from "@/services/playerSeasonStat.service";

export default {
  name: "D11TeamCard",
  props: {
    d11Team: Object,
    season: Object
  },
  components: {
    TeamImage: () => import("@/components/image/TeamImage"),
    D11TeamImage: () => import("@/components/image/D11TeamImage")
  },
  data: () => ({
    playerSeasonStats: null,
    visible: false
  }),
  computed: {
    total: {
      get() {
        let total = 0;
        if (this.playerSeasonStats) {
          this.playerSeasonStats.forEach(playerSeasonStat => {
            total = total + playerSeasonStat.value;
          });
        }
        return total;
      }
    }
  },
  watch: {
    visible() {
      PlayerSeasonStatService.getPlayerSeasonStatByD11TeamIdAndSeasonId(
        this.d11Team.id,
        this.season.id
      ).then(result => (this.playerSeasonStats = result));
    }
  }
};
</script>

<style lang="scss" scoped>
.d11-team-card-lazy {
  min-height: 525px;
}
.v-card.d11-team {
  min-height: 525px;
  .v-card__title {
    background-color: var(--v-primary-base);
    color: white !important;
    display: block;
    padding: 0px;
    .v-image {
      padding: 16px;
    }
  }

  .v-card__subtitle,
  .v-card__text {
    display: flex;
  }

  .v-card__text {
    line-height: 35px;
    min-height: 35px;
    padding-top: 0px;
  }

  .team-image {
    padding-right: 2px;
  }
  .position {
    min-width: 1.8em;
  }

  .fee,
  .total {
    margin-left: auto;
  }
  .fee,
  .sum {
    min-width: 2em;
    text-align: right;
  }
}
</style>
