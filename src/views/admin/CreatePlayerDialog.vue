<template>
  <v-dialog :fullscreen="xs" max-width="350" v-model="visible">
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" :open="open" />
    </template>

    <v-card v-if="visible">
      <v-card-title>
        <div class="dialog-title-container">
          <div class="dialog-title">Add New Player</div>
          <v-icon class="close-icon" @click="visible = false" small>
            mdi-close
          </v-icon>
        </div>
      </v-card-title>

      <form v-on:submit.prevent="submit">
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-container>
              <h4>Required Values</h4>
            </v-container>
            <v-card-text>
              <v-text-field
                label="First Name"
                name="firstName"
                id="firstName"
                v-model="player.firstName"
                @input="failed = false"
                outlined
                autofocus
                autocomplete="off"
              />

              <v-text-field
                label="Last Name*"
                name="lastName"
                id="lastName"
                v-model="player.lastName"
                @input="
                  $v.player.lastName.$touch();
                  failed = false;
                "
                :error-messages="lastNameErrors"
                outlined
                autocomplete="off"
              />

              <v-combobox
                v-model="team"
                :items="teams"
                label="Team*"
                item-text="name"
                @input="
                  $v.player.teamId.$touch();
                  failed = false;
                "
                :error-messages="teamIdErrors"
                outlined
                autocomplete="off"
              />

              <v-combobox
                v-model="position"
                :items="positions"
                label="Position*"
                item-text="name"
                @input="
                  $v.player.positionId.$touch();
                  failed = false;
                "
                :error-messages="positionIdErrors"
                outlined
                autocomplete="off"
              />

              <v-combobox
                v-model="country"
                :items="countries"
                label="Country*"
                item-text="name"
                @input="
                  $v.player.countryId.$touch();
                  failed = false;
                "
                :error-messages="countryIdErrors"
                outlined
                autocomplete="off"
              />

              <v-text-field
                label="WhoScored Id*"
                name="whoscoredId"
                id="whoscoredId"
                v-model="player.whoscoredId"
                @input="
                  $v.player.whoscoredId.$touch();
                  failed = false;
                "
                :error-messages="whoscoredIdErrors"
                outlined
                autocomplete="off"
              />

              <v-btn dark class="dialog-btn step-1" @click="next()">
                Next >>
              </v-btn>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="2">
            <v-container>
              <h4>Optional Values</h4>
            </v-container>
            <v-card-text>
              <v-text-field
                label="Full Name"
                name="fullName"
                id="fullName"
                v-model="player.fullName"
                @input="failed = false"
                outlined
                autofocus
                autocomplete="off"
              />

              <v-text-field
                label="Date of Birth"
                name="dateOfBirth"
                id="dateOfBirth"
                v-model="player.dateOfBirth"
                @input="
                  $v.player.dateOfBirth.$touch();
                  failed = false;
                "
                :error-messages="dateOfBirthErrors"
                outlined
                autocomplete="off"
              />

              <v-text-field
                label="Height"
                name="height"
                id="height"
                v-model="player.height"
                @input="
                  $v.player.height.$touch();
                  failed = false;
                "
                :error-messages="heightErrors"
                outlined
                autocomplete="off"
              />

              <v-btn dark class="dialog-btn step-2" type="submit">Add</v-btn>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="3">
            <v-card-text class="creating-player">
              Adding player...
              <loading-indicator class="centered" />
              {{ serviceErrors }}
            </v-card-text>
          </v-window-item>
        </v-window>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, numeric, requiredIf } from "vuelidate/lib/validators";
import PlayerService from "@/services/player.service";

export default {
  name: "CreatePlayerDialog",
  mixins: [validationMixin],
  validations: {
    player: {
      lastName: { required },
      whoscoredId: {
        required,
        numeric
      },
      height: { numeric },
      teamId: { required },
      positionId: { required },
      countryId: { required },
      dateOfBirth: {
        required: requiredIf(false)
      }
    }
  },
  components: {
    LoadingIndicator: () => import("@/components/LoadingIndicator")
  },
  data() {
    return {
      visible: false,
      step: 1,
      player: {},
      teams: this.allTeams(),
      team: null,
      positions: this.allPositions(),
      position: null,
      countries: this.allCountries(),
      country: null,
      failed: false,
      serviceErrors: null
    };
  },
  computed: {
    lastNameErrors() {
      const errors = [];
      if (!this.$v.player.lastName || !this.$v.player.lastName.$dirty)
        return errors;
      !this.$v.player.lastName.required && errors.push("Last name is required");
      return errors;
    },
    whoscoredIdErrors() {
      const errors = [];
      if (!this.$v.player.whoscoredId || !this.$v.player.whoscoredId.$dirty)
        return errors;
      !this.$v.player.whoscoredId.required &&
        errors.push("WhoScored id is required");
      !this.$v.player.whoscoredId.numeric &&
        errors.push("WhoScored id must be a number");
      return errors;
    },
    heightErrors() {
      const errors = [];
      if (!this.$v.player.height || !this.$v.player.height.$dirty)
        return errors;
      !this.$v.player.height.numeric && errors.push("Height must be a number");
      return errors;
    },
    teamIdErrors() {
      const errors = [];
      if (!this.$v.player.teamId || !this.$v.player.teamId.$dirty)
        return errors;
      !this.$v.player.teamId.required && errors.push("Team is required");
      return errors;
    },
    positionIdErrors() {
      const errors = [];
      if (!this.$v.player.positionId || !this.$v.player.positionId.$dirty)
        return errors;
      !this.$v.player.positionId.required &&
        errors.push("Position is required");
      return errors;
    },
    countryIdErrors() {
      const errors = [];
      if (!this.$v.player.countryId || !this.$v.player.countryId.$dirty)
        return errors;
      !this.$v.player.countryId.required && errors.push("Country is required");
      return errors;
    },
    dateOfBirthErrors() {
      const errors = [];
      if (
        !this.player.dateOfBirth ||
        !this.$v.player.dateOfBirth ||
        !this.$v.player.dateOfBirth.$dirty
      )
        return errors;
      if (
        !this.player.dateOfBirth.match("\\d{4}-\\d{2}-\\d{2}") ||
        !this.$moment(this.player.dateOfBirth).isValid()
      ) {
        errors.push("Invalid date");
      }
      return errors;
    }
  },
  methods: {
    next: function() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.step = 2;
      }
    },
    submit: function() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.step = 3;

        let insertResult = {};
        let insert = PlayerService.insertPlayer(this.player).then(
          result => (insertResult = result)
        );

        var timer = new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });

        Promise.allSettled([insert, timer]).then(() => {
          if (insertResult.errors.length === 0) {
            this.visible = false;
            this.$router.push({
              name: "player",
              params: {
                id: insertResult.playerId,
                seasonId: this.currentSeason().id
              }
            });
          } else {
            this.serviceErrors = insertResult.errors;
          }
        });
      }
    },
    open() {
      this.$v.$reset();
      this.step = 1;
      this.team = null;
      this.position = null;
      this.country = this.defaultCountry();
      this.serviceErrors = null;

      this.player = {
        firstName: "",
        lastName: "",
        fullName: "",
        teamId: null,
        countryId: this.country.id,
        positionId: null,
        whoscoredId: null,
        dateOfBirth: null,
        height: null
      };
      this.visible = true;
    }
  },
  watch: {
    team: function() {
      this.player.teamId = this.team ? this.team.id : null;
    },
    position: function() {
      this.player.positionId = this.position ? this.position.id : null;
    },
    country: function() {
      this.player.countryId = this.country ? this.country.id : null;
    }
  }
};
</script>

<style lang="scss" scoped>
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

  .creating-player {
    text-align: center;
  }

  .dialog-btn {
    height: 50px;
    width: 100%;
  }

  .dialog-btn.step-2 {
    margin-top: 258px;
  }
}

.v-window {
  min-height: 640px;
}
</style>
