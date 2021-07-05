<template>
  <div>
    <background-picture
      :type="backgroundPictureType"
      :id="backgroundPictureId"
      :alt="backgroundPictureAlt"
    />

    <section class="header-section">
      <div class="header-navigation">
        <v-container>
          <router-link :to="parentLink">
            <v-icon>mdi-chevron-left</v-icon><span>{{ parentLink.text }}</span>
          </router-link>
        </v-container>
      </div>

      <v-container class="header-container">
        <div class="header-background">
          <div class="navigation-button-container previous">
            <navigation-button
              v-if="previousLink"
              :to="previousLink"
              :direction="'left'"
            />
          </div>
          <div class="header-content">
            <slot />
          </div>
          <div class="navigation-button-container next">
            <navigation-button
              v-if="nextLink"
              :to="nextLink"
              :direction="'right'"
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
.header-section {
  position: relative;
  overflow: hidden;
  color: $header-color;
  height: 390px;
  z-index: 1;
  display: flex;
  flex-direction: column;

  .header-navigation {
    background: $overview-dark-background-color;

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
      height: 100%;
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
        .header-title {
          font-size: 1.5em;
        }

        .header-subtitle + .active-message {
          padding-bottom: $d11-large-spacer;
        }

        .header-subtitle + .horizontal {
          padding-top: $d11-large-spacer;
        }

        .header-info-list {
          .header-info-item {
            display: flex;
            div {
              line-height: 1.5em;
            }
            .header-info-item-description {
              font-weight: 600;
            }
          }
        }
      }
    }
  }
}
</style>
