<template>
  <v-container>
    <div class="available-players" v-if="playersByTeam">
      <div class="row" v-for="row in [0, 1, 2, 3]" :key="'row-' + row">
        <div
          class="column"
          v-for="column in [0, 1, 2, 3, 4]"
          :key="'column-' + column"
        >
          <div class="team">
            <team-image
              :size="'icon'"
              :id="playersByTeam[row * 5 + column].team.id"
            />
            {{ playersByTeam[row * 5 + column].team.name }}
          </div>
          <div
            class="player"
            v-for="player in playersByTeam[row * 5 + column].players"
            :key="player.playerName"
          >
            <div class="position-code">
              {{ player.positionCode }}
            </div>
            <div class="player-name">
              {{ player.playerName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import PlayerSeasonStatService from "@/services/playerSeasonStat.service";

export default {
  name: "TransferListing",
  data: () => ({
    playersByTeam: null
  }),
  components: {
    TeamImage: () => import("@/components/image/TeamImage")
  },
  mounted() {
    PlayerSeasonStatService.getAvailablePlayerSeasonStatBySeasonId(
      this.$route.params.seasonId
    ).then(result => (this.playersByTeam = result));
  }
};
</script>

<style lang="scss" scoped>
.available-players {
  .row {
    display: flex;
    margin-bottom: 20px;
  }
  .column {
    width: 20%;

    .team {
      margin-bottom: $d11-large-spacer;
    }

    .player {
      display: flex;
    }
    .position-code {
      min-width: 1.5em;
    }
  }
}

@media print {
  .available-players {
    margin-top: -64px;
    font-size: 9px;
  }
}
</style>
