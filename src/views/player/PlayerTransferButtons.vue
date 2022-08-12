<template>
  <div>
    <v-tooltip
      v-if="playerTransferStatus.transferListable"
      v-model="showToolTip"
      top
    >
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          v-on:click="transferList"
          class="admin-btn transfer-list"
          fab
          dark
          small
        >
          <v-icon dark>mdi-account-plus</v-icon>
        </v-btn>
      </template>
      <span>Transfer list player</span>
    </v-tooltip>

    <v-tooltip
      v-if="playerTransferStatus.transferListRemovable"
      v-model="showToolTip"
      top
    >
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          v-on:click="transferListRemove"
          class="admin-btn transfer-list-remove"
          fab
          dark
          small
        >
          <v-icon dark>mdi-account-remove</v-icon>
        </v-btn>
      </template>
      <span>Remove player from transfer list</span>
    </v-tooltip>

    <v-tooltip
      v-if="playerTransferStatus.transferBiddable"
      v-model="showToolTip"
      top
    >
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          v-on:click="transferBid"
          class="admin-btn transfer-bid"
          fab
          dark
          small
        >
          <v-icon dark>mdi-currency-eur</v-icon>
        </v-btn>
      </template>
      <span>Make transfer bid for player</span>
    </v-tooltip>

    <v-tooltip
      v-if="playerTransferStatus.transferBidRemovable"
      v-model="showToolTip"
      top
    >
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          v-on:click="transferBidRemove"
          class="admin-btn transfer-bid-removable"
          fab
          dark
          small
        >
          <v-icon dark>mdi-currency-eur-off</v-icon>
        </v-btn>
      </template>
      <span>Remove transfer bid for player</span>
    </v-tooltip>
  </div>
</template>

<script>
import TransferListingService from "@/services/transferListing.service";

export default {
  name: "PlayerTransferButtons",
  props: {
    playerTransferStatus: Object
  },
  data: () => ({
    showToolTip: false
  }),
  methods: {
    transferList: function() {
      TransferListingService.insertTransferListing(
        this.playerTransferStatus.id
      ).then(result => {
        this.redirectToD11Team(result.d11TeamId);
      });
    },
    transferListRemove: function() {
      TransferListingService.deleteTransferListing(
        this.playerTransferStatus.id
      ).then(result => {
        this.redirectToD11Team(result.d11TeamId);
      });
    },
    transferBid: function() {
      console.log("Transfer bid");
    },
    transferBidRemove: function() {
      console.log("Transfer bid remove");
    },
    redirectToD11Team: function(d11TeamId) {
      this.$router.push({
        name: "d11Team",
        params: {
          id: d11TeamId,
          seasonId: this.currentSeason().id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.v-main {
  .admin-btn {
    position: absolute;
    left: 42px;
    background-color: rgba(0, 0, 0, 0) !important;
    min-width: unset !important;
  }
}

.v-application-xs {
  .v-main {
    .admin-btn {
      left: 0px;
      top: 40px;
    }
  }
}
</style>
