<template>
  <v-container>
    <div class="available-players" v-if="playersByTeam">
      <div class="row" v-for="row in rows()" :key="'row-' + row">
        <div
          class="column"
          v-for="column in columns()"
          :key="'column-' + column"
        >
          <div class="team">
            <team-image
              :size="'icon'"
              :id="playersByTeam[index(row, column)].team.id"
            />
            {{ playersByTeam[index(row, column)].team.name }}
          </div>
          <div
            class="player"
            v-for="player in playersByTeam[index(row, column)].players"
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
  methods: {
    rows: function() {
      if (this.mdAndUp) {
        return [0, 1, 2, 3];
      } else if (this.smAndUp) {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      }
      return [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19
      ];
    },
    columns: function() {
      if (this.mdAndUp) {
        return [0, 1, 2, 3, 4];
      } else if (this.smAndUp) {
        return [0, 1];
      }
      return [0];
    },
    index: function(row, column) {
      if (this.mdAndUp) {
        return row * 5 + column;
      } else if (this.smAndUp) {
        return row * 2 + column;
      }
      return row;
    }
  },
  mounted() {
    let seasonId =
      this.$route.params.seasonId === "current"
        ? this.currentSeason().id
        : this.$route.params.seasonId;
    PlayerSeasonStatService.getAvailablePlayerSeasonStatBySeasonId(
      seasonId
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

.v-application-sm {
  .available-players {
    padding: $d11-spacer;
    .column {
      width: 50%;
    }
  }
}

.v-application-xs {
  .available-players {
    padding: $d11-spacer * 2;
    .column {
      width: 100%;
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
