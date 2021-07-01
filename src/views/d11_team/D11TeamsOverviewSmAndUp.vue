<template>
  <div class="d11-teams-overview">
    <background-picture :type="'stadium'" :id="19" :alt="'TOOO'" />

    <overview-section>
      <!-- Navigation -------------->
      <overview-navigation
        :link="{ name: 'seasons' }"
        :text="'Season History'"
      />

      <!-- Context ---------------->
      <overview-context class="d11-teams-context">
        <div class="date">
          Context
        </div>
      </overview-context>

      <!-- Spacer ------------------>
      <overview-spacer>
        <navigation-button
          v-if="season.id > 2"
          :to="{
            name: 'd11Teams',
            params: { seasonId: season.id - 1 }
          }"
          :direction="'left'"
        />
        <v-spacer />
        <navigation-button
          :to="{
            name: 'd11Teams',
            params: { seasonId: season.id + 1 },
            query: { ...this.$route.query }
          }"
          :direction="'right'"
        />
      </overview-spacer>

      <!-- Content ----------------->
      <overview-content-background>
        <overview-content class="season-name">
          D11 Teams Season {{ season.name }}
        </overview-content>
      </overview-content-background>
    </overview-section>
  </div>
</template>

<script>
export default {
  name: "D11TeamsOverviewSmAndUp",
  props: {
    season: Object
  },
  components: {
    BackgroundPicture: () => import("@/components/image/BackgroundImage"),
    OverviewSection: () => import("@/components/overview/OverviewSection"),
    OverviewNavigation: () =>
      import("@/components/overview/OverviewNavigation"),
    OverviewContext: () => import("@/components/overview/OverviewContext"),
    OverviewSpacer: () => import("@/components/overview/OverviewSpacer"),
    NavigationButton: () => import("@/components/NavigationButton"),
    OverviewContentBackground: () =>
      import("@/components/overview/OverviewContentBackground"),
    OverviewContent: () => import("@/components/overview/OverviewContent")
  }
};
</script>
