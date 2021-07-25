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
        show: true
      }"
    >
      <template v-if="transferDay">
        <div class="header-title">
          <h1>Transfer Day {{ transferDay.transferDayNumber }}</h1>
        </div>
        <div class="header-subtitle">
          <h4>
            {{
              transferDay.transferWindow.draft
                ? "D11 draft"
                : "Transfer Window " +
                  transferDay.transferWindow.transferWindowNumber
            }}, Season
            {{ transferDay.transferWindow.matchWeek.season.name }}
          </h4>
        </div>

        <div class="datetime">
          <v-icon medium class="mdi-icon">mdi-calendar-month</v-icon>
          Transfer deadline
          {{ transferDay.datetime | moment("dddd, MMMM Do YYYY [at] HH:mm") }}
        </div>
        <div class="match-week">
          <v-icon medium class="mdi-icon">mdi-account-arrow-right</v-icon>
          Players will be active for their new teams from match week
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
            Transfer Bids
          </v-tab>
          <v-tab class="transfer-listings-tab" href="#transfer-listings">
            Available Players
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
      import("@/views/player_season_stat/LazyPlayerSeasonStatList")
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
      TransferListingService.findTransferListingsByTransferDayId(
        this.$route.params.id,
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
