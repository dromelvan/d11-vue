<template>
  <div class="transfer-window">
    <!-- Header -------------------------------->
    <d11-header
      :backgroundPictureType="'stadium'"
      :backgroundPictureId="19"
      :backgroundPictureAlt="'TODO'"
      :parentLink="{
        text: transferWindow
          ? 'Season ' + transferWindow.matchWeek.season.name
          : '',
        name: 'season',
        params: { id: transferWindow ? transferWindow.matchWeek.season.id : 0 }
      }"
      :previousLink="{
        name: 'transferWindow',
        params: {
          id: transferWindow ? transferWindow.id - 1 : 0,
          tab: tab
        },
        show: true
      }"
      :nextLink="{
        name: 'transferWindow',
        params: {
          id: transferWindow ? transferWindow.id + 1 : 0,
          tab: tab
        },
        show: true
      }"
    >
      <template v-if="transferWindow">
        <div class="header-title">
          <h1 v-if="transferWindow.draft">
            D11 Draft
          </h1>
          <h1 v-else>
            Transfer Window {{ transferWindow.transferWindowNumber }}
          </h1>
        </div>
        <div class="header-subtitle">
          <h4>Season {{ transferWindow.matchWeek.season.name }}</h4>
        </div>

        <div class="datetime">
          <v-icon medium class="mdi-icon">mdi-calendar-month</v-icon>
          {{
            transferWindow.datetime | moment("dddd, MMMM Do YYYY [at] HH:mm")
          }}
        </div>
        <div class="match-week">
          <v-icon medium class="mdi-icon">mdi-account-arrow-right</v-icon>
          Players will be active for their new teams from match week
          {{ transferWindow.matchWeek.matchWeekNumber }}
        </div>
      </template>
    </d11-header>

    <!-- Content ------------------------------>

    <content-section>
      <v-container class="tabs-container">
        <v-tabs v-model="tab">
          <v-tab class="transfers-tab" href="#transfers">
            <template v-if="transferWindow">
              <template v-if="transferWindow.draft">
                D11 Draft Transfers
              </template>
              <template v-else>
                Window {{ transferWindow.transferWindowNumber }} Transfers
              </template>
            </template>
          </v-tab>
          <v-tab class="transfer-days-tab" href="#transfer-days">
            Transfer Days
          </v-tab>
          <v-tabs-items :value="tab">
            <v-tab-item value="transfers">
              <lazy-transfer-list
                v-for="transferDay in transferDays"
                :key="transferDay.id"
                :transferDay="transferDay"
                :context="'Transfer Day ' + transferDay.transferDayNumber"
              />
            </v-tab-item>
            <v-tab-item value="transfer-days">
              <template v-if="transferWindow">
                <lazy-transfer-day-list
                  v-for="transferWindow in [transferWindow]"
                  :key="transferWindow.id"
                  :transferWindow="transferWindow"
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
import TransferWindowService from "@/services/transferWindow.service";

export default {
  name: "TransferWindow",
  data: () => ({
    transferWindow: null,
    transferDays: null,
    tab: "transfers"
  }),
  components: {
    D11Header: () => import("@/components/header/D11Header"),
    ContentSection: () => import("@/components/ContentSection"),
    LazyTransferList: () => import("@/views/transfer/LazyTransferList"),
    LazyTransferDayList: () =>
      import("@/views/transfer_day/LazyTransferDayList")
  },
  methods: {
    loadData: function() {
      let id =
        this.$route.params.id === "current"
          ? this.currentTransferWindow().id
          : this.$route.params.id;
      TransferWindowService.getTransferWindowData(id).then(result => {
        this.transferWindow = result.transferWindow;
        this.transferDays = result.transferDays;
      });
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
        this.transferWindow == null ||
        this.$route.params.id != this.transferWindow.id
      ) {
        this.loadData();
      }
    }
  }
};
</script>
