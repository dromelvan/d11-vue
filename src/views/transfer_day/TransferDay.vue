<template>
  <div class="transfer-day">
    <!-- Header -------------------------------->
    <d11-header
      :backgroundPictureType="'stadium'"
      :backgroundPictureId="19"
      :backgroundPictureAlt="'TODO'"
      :parentLink="{
        text: transferDay
          ? transferDay.transferWindow.draft
            ? 'D11 Draft'
            : 'Transfer Window ' +
              transferDay.transferWindow.transferWindowNumber
          : '',
        name: 'transferWindow',
        params: {
          id: transferDay ? transferDay.transferWindow.id : 0,
          tab: 'transfer-days'
        }
      }"
      :previousLink="{
        name: 'transferDay',
        params: {
          id: transferDay ? transferDay.id - 1 : 0,
          tab: tab
        },
        show: true
      }"
      :nextLink="{
        name: 'transferDay',
        params: {
          id: transferDay ? transferDay.id + 1 : 0,
          tab: tab
        },
        show: transferDay && transferDay.id < maxTransferDayId()
      }"
    >
      <template v-if="transferDay">
        <div class="header-title">
          <h1>Transfer Day {{ transferDay.transferDayNumber }}</h1>
          <update-transfer-day-dialog
            :transferDay="transferDay"
            @transfer-day-updated="loadData"
            v-if="administrator() && pending(transferDay.status)"
          />
        </div>
        <div class="header-subtitle">
          <h4>
            {{
              transferDay.transferWindow.draft
                ? "D11 draft"
                : "Transfer Window " +
                  transferDay.transferWindow.transferWindowNumber
            }}, <template v-if="smAndUp">Season</template>
            {{ transferDay.transferWindow.matchWeek.season.name }}
          </h4>
        </div>

        <div class="datetime">
          <v-icon medium class="mdi-icon">mdi-calendar-month</v-icon>
          <template v-if="smAndUp">
            Transfer deadline
            {{ transferDay.datetime | moment("dddd, MMMM Do YYYY [at] HH:mm") }}
          </template>
          <template v-else>
            Deadline
            {{ transferDay.datetime | moment("DD.MM YYYY [at] HH:mm") }}
          </template>
        </div>
        <div class="match-week">
          <v-icon medium class="mdi-icon">mdi-account-arrow-right</v-icon>
          <template v-if="smAndUp">
            Players will be active for their new teams from match week
          </template>
          <template v-else>
            Players active match week
          </template>
          {{ transferDay.transferWindow.matchWeek.matchWeekNumber }}
        </div>
      </template>
    </d11-header>

    <!-- Content ------------------------------>
    <content-section>
      <v-container class="tabs-container">
        <v-tabs v-model="tab">
          <v-tab class="transfers-tab" href="#transfers">
            Transfers
          </v-tab>
          <v-tab class="transfer-bids-tab" href="#transfer-bids">
            <template v-if="smAndUp">
              Transfer Bids
            </template>
            <template v-else>
              Bids
            </template>
          </v-tab>
          <v-tab class="transfer-listings-tab" href="#transfer-listings">
            <template v-if="smAndUp">
              Available Players
            </template>
            <template v-else>
              Players
            </template>
          </v-tab>
          <v-tabs-items :value="tab">
            <v-tab-item value="transfers">
              <template v-if="transferDay">
                <lazy-transfer-list
                  v-for="transferDay in [transferDay]"
                  :key="transferDay.id"
                  :transferDay="transferDay"
                />
              </template>
            </v-tab-item>
            <v-tab-item value="transfer-bids">
              <template v-if="transferDay">
                <lazy-transfer-bid-list
                  v-for="transferDay in [transferDay]"
                  :key="transferDay.id"
                  :transferDay="transferDay"
                />
              </template>
            </v-tab-item>
            <v-tab-item value="transfer-listings">
              <template v-if="transferDay">
                <v-pagination
                  v-model="page"
                  :length="Math.ceil(transferDay.transferListingCount / 25)"
                  :total-visible="15"
                />

                <lazy-player-season-stat-list
                  :context="'Player'"
                  :playerSeasonStats="transferListings"
                  view="transferListing"
                  @findPlayerSeasonStats="getTransferListings"
                />

                <v-pagination
                  v-model="page"
                  :length="Math.ceil(transferDay.transferListingCount / 25)"
                  :total-visible="15"
                />
              </template>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-container>
    </content-section>
  </div>
</template>

<script>
import TransferDayService from "@/services/transferDay.service";
import TransferListingService from "@/services/transferListing.service";

export default {
  name: "TransferDay",
  data: () => ({
    transferDay: null,
    transferListings: null,
    page: 1,
    tab: "transfers"
  }),
  components: {
    D11Header: () => import("@/components/header/D11Header"),
    ContentSection: () => import("@/components/ContentSection"),
    LazyTransferList: () => import("@/views/transfer/LazyTransferList"),
    LazyTransferBidList: () =>
      import("@/views/transfer_bid/LazyTransferBidList"),
    LazyPlayerSeasonStatList: () =>
      import("@/views/player_season_stat/LazyPlayerSeasonStatList"),
    UpdateTransferDayDialog: () =>
      import("@/views/admin/UpdateTransferDayDialog")
  },
  methods: {
    loadData: function() {
      TransferDayService.findTransferDayById(this.$route.params.id).then(
        result => {
          this.transferDay = result;
        }
      );
    },
    getTransferListings: function() {
      let transferDayId = this.$route.params.id;
      if (transferDayId === "current") {
        transferDayId = this.currentTransferDay().id;
      }
      TransferListingService.findTransferListingsByTransferDayId(
        transferDayId,
        this.page - 1
      ).then(result => (this.transferListings = result));
    }
  },
  mounted() {
    this.tab = this.$route.params.tab;
    this.loadData();
  },
  watch: {
    $route() {
      this.tab = this.$route.params.tab;
      if (
        this.transferDay == null ||
        this.$route.params.id != this.transferDay.id
      ) {
        this.loadData();
        this.transferListings = null;
        this.page = 1;
        this.getTransferListings();
      }
    },
    page() {
      this.getTransferListings();
    }
  }
};
</script>

<style lang="scss" scoped>
.v-application-xs {
  .v-tab {
    width: 33% !important;
  }
}
</style>
