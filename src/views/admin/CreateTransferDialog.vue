<template>
  <v-dialog :fullscreen="xs" max-width="350" v-model="visible">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="admin-btn transfer"
        style="background-color: rgba(0,0,0,0) !important; min-width: unset !important"
        fab
        dark
        small
        v-bind="attrs"
        v-on="on"
      >
        <v-icon dark>
          mdi-currency-gbp
        </v-icon>
      </v-btn>
    </template>

    <v-card v-if="visible">
      <v-card-title>
        <div class="dialog-title-container">
          <div class="dialog-title">Transfer Player</div>
          <v-icon class="close-icon" @click="visible = false" small>
            mdi-close
          </v-icon>
        </div>
      </v-card-title>

      <form v-on:submit.prevent="submit">
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-container class="h1-container">
              <div class="avatar-container">
                <v-avatar size="62">
                  <player-image :size="'small'" :id="player.id" />
                </v-avatar>
              </div>

              <h1>
                {{ player.name }}
              </h1>
            </v-container>
            <v-card-text>
              <v-combobox
                v-model="d11Team"
                :items="d11Teams"
                label="D11 Team*"
                item-text="name"
                @input="
                  $v.transfer.d11TeamId.$touch();
                  failed = false;
                "
                :error-messages="d11TeamIdErrors"
                outlined
                autofocus
                autocomplete="off"
              />

              <v-text-field
                label="Fee"
                name="fee"
                id="fee"
                v-model="fee"
                @input="
                  $v.transfer.fee.$touch();
                  failed = false;
                "
                :error-messages="feeErrors"
                outlined
                autocomplete="off"
              />

              <v-btn dark class="dialog-btn" type="submit">Transfer</v-btn>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="2">
            <v-card-text class="creating-transfer" v-if="waiting">
              <v-container>
                Transferring player...
                <loading-indicator class="centered" />
              </v-container>
            </v-card-text>
            <v-card-text v-else class="service-errors">
              <v-container>
                <h4>Transfer Failed</h4>
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
import { validationMixin } from "vuelidate";
import { required, decimal } from "vuelidate/lib/validators";
import TransferService from "@/services/transfer.service";

export default {
  name: "CreateTransferDialog",
  mixins: [validationMixin],
  validations: {
    transfer: {
      d11TeamId: { required },
      fee: { required, decimal }
    }
  },
  props: {
    player: Object,
    playerSeasonStat: Object
  },
  components: {
    LoadingIndicator: () => import("@/components/LoadingIndicator"),
    PlayerImage: () => import("@/components/image/PlayerImage")
  },
  data() {
    return {
      visible: false,
      step: 1,
      transfer: {},
      d11Teams: this.currentD11Teams(),
      d11Team: null,
      fee: null,
      failed: false,
      serviceErrors: null,
      waiting: true
    };
  },
  computed: {
    d11TeamIdErrors() {
      const errors = [];
      if (!this.$v.transfer.d11TeamId || !this.$v.transfer.d11TeamId.$dirty)
        return errors;
      !this.$v.transfer.d11TeamId.required &&
        errors.push("D11 team is required");
      return errors;
    },
    feeErrors() {
      const errors = [];
      if (!this.$v.transfer.fee || !this.$v.transfer.fee.$dirty) return errors;
      !this.$v.transfer.fee.required && errors.push("Fee is required");
      !this.$v.transfer.fee.decimal && errors.push("Fee must be a number");
      if ((this.fee * 10) % 5 != 0) {
        errors.push("Fee must be divisible by 5");
      }
      return errors;
    }
  },
  methods: {
    submit: function() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.step = 2;

        let insertResult = {};

        let insert = TransferService.insertTransfer(this.transfer).then(
          result => (insertResult = result)
        );

        var timer = new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });

        Promise.allSettled([insert, timer]).then(() => {
          if (insertResult.errors && insertResult.errors.length === 0) {
            this.visible = false;
            this.$router.push({
              name: "d11Team",
              params: {
                id: this.transfer.d11TeamId,
                seasonId: this.currentSeason().id
              }
            });
          } else {
            this.waiting = false;
            this.serviceErrors = insertResult.errors;
          }
        });
      }
    },
    open() {
      this.d11Teams = this.currentD11Teams();
      this.d11Team = null;
      this.fee = null;

      this.$v.$reset();
      this.step = 1;

      this.serviceErrors = null;

      this.transfer = {
        playerId: this.player.id,
        d11TeamId: null,
        fee: this.fee
      };
      this.visible = true;
      this.waiting = true;
    }
  },
  watch: {
    visible: function() {
      if (this.visible) {
        this.open();
      }
    },
    d11Team: function() {
      this.transfer.d11TeamId = this.d11Team ? this.d11Team.id : null;
    },
    fee: function() {
      this.transfer.fee = this.fee ? this.fee * 10 : null;
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
  top: 270px;
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
      min-height: 260px;
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
    height: 50px;
    width: 100%;
  }

  .v-window {
    min-height: 346px;
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
