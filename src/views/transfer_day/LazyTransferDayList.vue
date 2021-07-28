<template>
  <v-lazy
    v-model="visible"
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
  >
    <loading-indicator v-if="!transferDays" class="centered" />

    <div class="transfer-days" v-else>
      <list-container>
        <template v-slot:header>
          <div class="list-container-header">
            <div class="transfer-day-number">
              Transfer Day
            </div>
            <div class="datetime after-main-item">
              <template v-if="smAndUp">
                Transfer Deadline
              </template>
              <template v-else>
                Deadline
              </template>
            </div>
            <div class="status">
              Status
            </div>
          </div>
        </template>
        <div v-for="transferDay in transferDays" :key="transferDay.id">
          <list-container-item
            class="transfer-container"
            :to="{ name: 'transferDay', params: { id: transferDay.id } }"
          >
            <v-list-item-title class="transfer-day">
              <div class="transfer-day-number">
                Transfer day {{ transferDay.transferDayNumber }}
              </div>
              <div class="datetime after-main-item">
                <template v-if="smAndUp">
                  {{
                    transferDay.datetime
                      | moment("dddd, MMMM Do YYYY [at] HH:mm")
                  }}
                </template>
                <template v-else>
                  {{ transferDay.datetime | moment("MM.DD YY [at] HH:mm") }}
                </template>
              </div>
              <div class="status">
                {{ transferDay.status }}
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
import TransferDayService from "@/services/transferDay.service";

export default {
  name: "LazyTransferDayList",
  props: {
    transferWindow: Object
  },
  data: () => ({
    visible: false,
    transferDays: null
  }),
  components: {
    LoadingIndicator: () => import("@/components/LoadingIndicator"),
    ListContainer: () => import("@/components/ListContainer"),
    ListContainerItem: () => import("@/components/ListContainerItem")
  },
  watch: {
    visible: function() {
      TransferDayService.findTransferDaysByTransferWindowId(
        this.transferWindow.id
      ).then(result => (this.transferDays = result));
    }
  }
};
</script>

<style lang="scss" scoped>
.v-lazy {
  min-height: 100px;
}

.datetime {
  min-width: 18em;
  text-align: left !important;
}

.status {
  min-width: 5em;
  text-align: left !important;
}

.v-application-xs {
  .transfer-day-number {
    text-align: left !important;
    min-width: 6.5em;
  }
  .datetime {
    min-width: 8em;
  }
}
</style>
