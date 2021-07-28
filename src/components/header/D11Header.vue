<template>
  <div class="d11-header">
    <background-picture
      :type="backgroundPictureType"
      :id="backgroundPictureId"
      :alt="backgroundPictureAlt"
      v-if="smAndUp"
    />

    <section class="header-section">
      <div class="header-navigation" v-if="parentLink">
        <v-container>
          <router-link :to="parentLink">
            <v-icon v-if="parentLink.text">mdi-chevron-left</v-icon>
            <span>{{ parentLink.text }}</span>
          </router-link>
        </v-container>
      </div>

      <v-container class="header-container">
        <div class="header-background">
          <div
            class="navigation-button-container previous"
            v-if="previousLink && previousLink.show"
          >
            <navigation-button
              :to="previousLink"
              :size="smAndUp ? 50 : 20"
              :padding="smAndUp ? 20 : 10"
              :direction="'left'"
            />
          </div>
          <div class="header-content">
            <slot />
          </div>
          <div class="navigation-button-container next">
            <navigation-button
              :to="nextLink"
              :size="smAndUp ? 50 : 20"
              :padding="smAndUp ? 20 : 10"
              :direction="'right'"
              v-if="nextLink && nextLink.show"
            />
          </div>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  name: "D11Header",
  props: {
    backgroundPictureType: String,
    backgroundPictureId: Number,
    backgroundPictureAlt: String,
    parentLink: Object,
    previousLink: Object,
    nextLink: Object
  },
  components: {
    BackgroundPicture: () => import("@/components/image/BackgroundImage"),
    NavigationButton: () => import("@/components/NavigationButton")
  }
};
</script>

<style lang="scss" scoped>
.d11-header {
  background-color: black;
  .header-section {
    position: relative;
    overflow: hidden;
    color: $header-color;
    min-height: 390px;
    z-index: 1;
    display: flex;
    flex-direction: column;

    .header-navigation {
      background: $overview-dark-background-color;
      min-height: 3.563em;

      span {
        vertical-align: middle;
        font-size: 22px;
        font-weight: 700;
      }

      .v-icon {
        font-size: 1.8em;
        color: $header-color;
      }

      a {
        color: $header-color;
        text-decoration: none;
      }
    }

    .header-container {
      flex: 1;
      position: relative;

      .header-background {
        padding: 0.75em;
        line-height: 1.8em;
        min-height: 308px;
        background-color: $header-content-background-color;
        display: flex;
        .navigation-button-container {
          display: flex;
          align-items: center;
        }

        .navigation-button-container.previous {
          padding-right: $d11-spacer;
        }

        .navigation-button-container.next {
          padding-left: $d11-spacer;
        }

        .header-content {
          width: 100%;
          display: flex;
          flex-direction: column;

          .header-title {
            font-size: 1.5em;
            display: flex;

            h1 {
              margin-right: auto;
            }

            .external-link {
              font-size: 0.65em;
            }
          }

          .header-subtitle + .active-message {
            margin-bottom: $d11-large-spacer;
          }

          .header-subtitle + .horizontal {
            margin-top: $d11-large-spacer;
          }

          .mdi-icon {
            color: $header-color;
            margin-top: -3px;
          }

          a {
            color: $header-color;
            text-decoration: none;
          }

          a + .mdi-icon {
            margin-top: -1px;
          }
        }
      }
    }
  }
}

.v-application-xs {
  .d11-header {
    background-color: var(--v-primary-lighten1);

    .header-section {
      min-height: unset;

      .header-container {
        padding: 0px;

        .header-background {
          padding: $d11-spacer;
          min-height: unset;
          //background-image: url("../../assets/images/app-bar-background-sm-and-down.png");
          .navigation-button-container {
            align-items: unset;
            min-width: 2.25em;
          }

          .header-content {
            .header-title {
              font-size: 1.2em;
            }
            .horizontal {
              display: unset;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
