<template>
  <v-dialog :fullscreen="xs" max-width="350" v-model="visible">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="admin-btn activate"
        style="background-color: rgba(0,0,0,1) !important; min-width: unset !important"
        fab
        dark
        small
        v-bind="attrs"
        v-on="on"
      >
        <v-icon dark>
          mdi-account-reactivate
        </v-icon>
      </v-btn>
    </template>

    <v-card v-if="visible">
      <v-card-title>
        <div class="dialog-title-container">
          <div class="dialog-title">Activate Transfer Day</div>
          <v-icon class="close-icon" @click="visible = false" small>
            mdi-close
          </v-icon>
        </div>
      </v-card-title>

      <form v-on:submit.prevent="submit">
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-container class="h1-container">
              <h4>Transfer Day {{ transferDay.transferDayNumber }}</h4>
            </v-container>
            <v-card-text>
              Activate the transfer day and add transfer listings for all
              available players.
              <v-btn dark class="dialog-btn" type="submit">Activate</v-btn>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="2">
            <v-card-text class="activating-transfer-day" v-if="waiting">
              <v-container>
                Activating transfer day...
                <loading-indicator class="centered" />
              </v-container>
            </v-card-text>
            <v-card-text v-else class="service-errors">
              <v-container>
                <h4>Activation Failed</h4>
              </v-container>
              <v-container v-for="error in serviceErrors" :key="error">
                {{ error }}
              </v-container>
            </v-card-text>
          </v-window-item>
        </v-window>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import TransferDayService from "@/services/transferDay.service";

export default {
  name: "UpdateTransferDayDialog",
  props: {
    transferDay: Object
  },
  components: {
    LoadingIndicator: () => import("@/components/LoadingIndicator")
  },
  data() {
    return {
      visible: false,
      step: 1,
      serviceErrors: null,
      waiting: true
    };
  },
  methods: {
    submit: function() {
      if (this.pending(this.transferDay.status)) {
        this.step = 2;

        let insertResult = {};

        let insert = TransferDayService.updateTransferDay({
          id: this.transferDay.id,
          status: "Active"
        }).then(result => (insertResult = result));

        var timer = new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });

        Promise.allSettled([insert, timer]).then(() => {
          if (insertResult.errors && insertResult.errors.length === 0) {
            this.visible = false;
            this.$emit("transfer-day-updated", true);
          } else {
            this.waiting = false;
            this.serviceErrors = insertResult.errors;
          }
        });
      }
    },
    open() {
      this.step = 1;
      this.serviceErrors = null;
      this.visible = true;
    }
  },
  watch: {
    visible: function() {
      if (this.visible) {
        this.open();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.h1-container {
  display: flex;
  h1 {
    margin-top: 8px;
    margin-left: $d11-spacer;
  }
}

.admin-btn {
  position: absolute;
  left: 42px;
}

.menu-link {
  color: white;
}

.v-dialog {
  .v-card {
    .v-card__title {
      background-color: rgba(0, 10, 60) !important;
      color: white;
      font-size: 1rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0;
    }

    .v-card__text {
      min-height: 170px;
    }
  }

  .dialog-title-container {
    display: flex;
    width: 100%;

    .dialog-title {
      width: 100%;
      text-align: center;
      padding-left: 16px;
    }

    .close-icon {
      height: 16px;
      padding-top: 16px;
      color: white;
    }
  }

  .creating-transfer {
    text-align: center;
  }

  .dialog-btn {
    margin-top: 42px;
    height: 50px;
    width: 100%;
  }

  .v-window {
    min-height: 210px;
  }

  .service-errors {
    h4 {
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0;
    }
  }
}
</style>
