<template>
  <v-lazy
    v-model="visible"
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
  >
    <loading-indicator v-if="!transferBids" class="centered" />

    <div class="transfer-bids" v-else>
      <list-container>
        <template v-slot:header>
          <div class="list-container-header">
            <div class="player main-item">
              Player
            </div>
            <div class="player-ranking" v-if="smAndUp">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">#</span>
                </template>
                <span>
                  The ranking the player had at the time of the transfer day
                </span>
              </v-tooltip>
            </div>
            <div class="d11-team-ranking" v-if="smAndUp">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">D11 #</span>
                </template>
                <span>
                  The ranking the D11 team had at the time of the transfer day
                </span>
              </v-tooltip>
            </div>
            <div class="bid" v-if="smAndUp">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">Bid</span>
                </template>
                <span>The bid made for the player</span>
              </v-tooltip>
            </div>
            <div class="active-bid">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">Act. Bid</span>
                </template>
                <span>The active bid made for the player</span>
              </v-tooltip>
            </div>
            <div class="successful">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">Suc.</span>
                </template>
                <span>Successful bid</span>
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
        <div v-for="transferBid in transferBids" :key="transferBid.id">
          <list-container-item
            :to="{
              name: 'player',
              params: {
                id: transferBid.player.id,
                seasonId: currentSeason().id
              }
            }"
            class="transfer-container"
            v-bind:class="{ inactive: transferBid.activeFee <= 0 }"
          >
            <v-list-item-title class="transfer-bid">
              <!-- Player image ---------------->
              <div class="image" v-if="smAndUp">
                <player-image :size="'tiny'" :id="transferBid.player.id" />
              </div>
              <!-- Player name ----------------->
              <div class="player main-item">
                {{ transferBid.player.name }}
              </div>
              <!-- Player ranking ----------------->
              <div class="player-ranking" v-if="smAndUp">
                {{ transferBid.playerRanking }}
              </div>
              <!-- D11 team ranking ---------------->
              <div class="d11-team-ranking" v-if="smAndUp">
                {{ transferBid.d11TeamRanking }}
              </div>
              <!-- Bid ------------------------->
              <div class="bid" v-if="smAndUp">
                £{{ playerValue(transferBid.fee) }}m
              </div>
              <!-- Active Bid ------------------>
              <div class="active-bid">
                £{{ playerValue(transferBid.activeFee) }}m
              </div>
              <!-- Successful ------------------>
              <div class="successful">
                <template v-if="transferBid.successful">
                  <v-icon medium class="mdi-icon">mdi-check</v-icon>
                </template>
                <template>
                  &nbsp;
                </template>
              </div>
              <!-- D11 Team -------------------->
              <div class="d11-team">
                <d11-team-image size="tiny" :id="transferBid.d11Team.id" />
                <template v-if="smAndUp">
                  {{ transferBid.d11Team.name }}
                </template>
                <template v-else>
                  {{ transferBid.d11Team.code }}
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
import TransferBidService from "@/services/transferBid.service";

export default {
  name: "LazyTransferDayList",
  props: {
    transferDay: Object
  },
  data: () => ({
    visible: false,
    transferBids: null
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
      TransferBidService.findTransferBidsByTransferDayId(
        this.transferDay.id
      ).then(result => (this.transferBids = result));
    }
  }
};
</script>

<style lang="scss" scoped>
.v-lazy {
  min-height: 100px;
}

.inactive {
  color: rgba(0, 10, 60, 0.3);
  font-style: italic;
  text-decoration: line-through;
}

.image {
  min-width: 44px;
}

.player-ranking {
  min-width: 2rem;
}

.d11-team-ranking {
  min-width: 3.5rem;
}

.bid {
  min-width: 4rem;
}

.active-bid {
  min-width: 4.5rem;
  padding-right: 0px !important;
}

.successful {
  min-width: 3rem;
  padding-right: 0px !important;
  .mdi-icon {
    color: var(--v-success-base);
  }
}

.d11-team {
  text-align: left !important;
  width: 15rem;
}

.v-application-xs {
  .d11-team {
    width: unset;
    min-width: 3.9rem;
  }
}
</style>
