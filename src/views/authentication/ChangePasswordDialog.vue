<template>
  <v-dialog :fullscreen="xs" max-width="350" v-model="visible">
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" :open="open" />
    </template>

    <v-card v-if="visible">
      <v-card-title>
        <div class="dialog-title-container">
          <div class="dialog-title">Change Password</div>
          <v-icon class="close-icon" @click="visible = false" small
            >mdi-close</v-icon
          >
        </div>
      </v-card-title>

      <div class="avatar-container">
        <v-avatar size="62">
          <img src="@/assets/images/d11-avatar.png" alt="D11" />
        </v-avatar>
      </div>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <form v-on:submit.prevent="submit">
              <v-text-field
                label="New Password*"
                name="password"
                id="password"
                v-model="userRegistration.password"
                @input="
                  $v.userRegistration.password.$touch();
                  failed = false;
                "
                :error-messages="passwordErrors"
                :type="'password'"
                outlined
                autofocus
              />
              <v-text-field
                label="Confirm New Password*"
                name="confirmPassword"
                id="confirmPassword"
                v-model="userRegistration.confirmPassword"
                @input="
                  $v.userRegistration.confirmPassword.$touch();
                  failed = false;
                "
                :error-messages="confirmPasswordErrors"
                :type="'password'"
                outlined
              />

              <v-btn dark class="dialog-btn" type="submit"
                >Change Password</v-btn
              >
            </form>
          </v-card-text>
        </v-window-item>
        <v-window-item :value="2">
          <v-card-text class="changing-password">
            Changing password...
            <loading-indicator class="centered" />
          </v-card-text>
        </v-window-item>
      </v-window>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, sameAs } from "vuelidate/lib/validators";
import AuthenticationService from "@/services/authentication.service";

export default {
  name: "ChangePasswordDialog",
  mixins: [validationMixin],
  components: {
    LoadingIndicator: () => import("@/components/LoadingIndicator")
  },
  data() {
    return {
      visible: false,
      step: 1,
      userRegistration: {
        password: null,
        confirmPassword: null
      },
      failed: false
    };
  },
  validations: {
    userRegistration: {
      password: { required },
      confirmPassword: {
        required,
        sameAsPw: sameAs(function() {
          return this.userRegistration.password;
        })
      }
    }
  },
  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.userRegistration.password.$dirty) return errors;
      !this.$v.userRegistration.password.required &&
        errors.push("Password is required");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.userRegistration.confirmPassword.$dirty) return errors;
      !this.$v.userRegistration.confirmPassword.required &&
        errors.push("Password confirmation is required");
      !this.$v.userRegistration.confirmPassword.sameAsPw &&
        errors.push("Password and password confirmation must match");
      return errors;
    }
  },
  methods: {
    submit: function() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.step = 2;
        this.failed = false;

        var passwordChanged = AuthenticationService.changePassword(
          this.userRegistration
        ).catch(() => {
          this.failed = true;
        });

        var timer = new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });

        Promise.allSettled([passwordChanged, timer]).then(() => {
          if (!this.failed) {
            this.visible = false;
            this.$router.push({
              name: "home"
            });
          } else {
            this.step = 1;
          }
        });
      }
    },
    open() {
      this.visible = true;
    }
  },
  watch: {
    visible: function() {
      if (this.visible) {
        this.$emit("logging-in", true);
      }
      if (!this.visible) {
        this.$emit("logging-in", false);
        this.$v.$reset();
        this.step = 1;
        this.userRegistration.password = null;
        this.userRegistration.confirmPassword = null;
        this.failed = true;
      }
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
      font-size: 1.5rem;
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
    }
  }

  .avatar-container {
    text-align: center;
    width: 100%;
  }

  .changing-password {
    text-align: center;
  }

  .dialog-btn {
    height: 50px;
    width: 100%;
  }
}
</style>
