<template>
  <v-lazy
    v-model="visible"
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
  >
    <loading-indicator v-if="!transfers" class="centered" />

    <div class="transfers" v-else>
      <list-container>
        <template v-slot:header>
          <div class="list-container-header">
            <div class="player">
              {{ context }}
            </div>

            <div class="fee after-main-item">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">Fee</span>
                </template>
                <span>The fee paid for the player</span>
              </v-tooltip>
            </div>
            <div class="d11-team">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">D11 Team</span>
                </template>
                <span>The D11 team that aquired the player</span>
              </v-tooltip>
            </div>
          </div>
        </template>
        <div v-for="transfer in transfers" :key="transfer.id">
          <list-container-item
            class="transfer-container"
            :to="{
              name: 'player',
              params: {
                id: transfer.player.id,
                seasonId: currentSeason().id
              }
            }"
          >
            <v-list-item-title class="transfer">
              <!-- Player image ---------------->
              <div class="image" v-if="smAndUp">
                <player-image :size="'tiny'" :id="transfer.player.id" />
              </div>
              <!-- Player name ----------------->
              <div class="player">
                {{ transfer.player.name }}
              </div>
              <!-- Fee ------------------------->
              <div class="fee after-main-item">
                £{{ playerValue(transfer.fee) }}m
              </div>
              <!-- D11 Team -------------------->
              <div class="d11-team">
                <d11-team-image size="tiny" :id="transfer.d11Team.id" />
                <template v-if="smAndUp">
                  {{ transfer.d11Team.name }}
                </template>
                <template v-else>
                  {{ transfer.d11Team.code }}
                </template>
              </div>
            </v-list-item-title>
          </list-container-item>
          <v-divider />
        </div>
      </list-container>
    </div>
  </v-lazy>
</template>

<script>
import TransferService from "@/services/transfer.service";

export default {
  name: "LazyTransferList",
  props: {
    transferDay: Object,
    context: {
      type: String,
      default: "Player"
    }
  },
  data: () => ({
    visible: false,
    transfers: null
  }),
  components: {
    LoadingIndicator: () => import("@/components/LoadingIndicator"),
    ListContainer: () => import("@/components/ListContainer"),
    ListContainerItem: () => import("@/components/ListContainerItem"),
    PlayerImage: () => import("@/components/image/PlayerImage"),
    D11TeamImage: () => import("@/components/image/D11TeamImage")
  },
  watch: {
    visible: function() {
      TransferService.findTransfersByTransferDayId(this.transferDay.id).then(
        result => (this.transfers = result)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.v-lazy {
  min-height: 100px;
}

.image {
  min-width: 44px;
}

.fee {
  min-width: 4rem;
}

.d11-team {
  text-align: left !important;
  width: 15rem;
}

.v-application-xs {
  .d11-team {
    width: unset;
    min-width: 4rem;
  }
}
</style>
