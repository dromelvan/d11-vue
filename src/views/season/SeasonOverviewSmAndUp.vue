<template>
  <div class="season-overview">
    <background-picture :type="'stadium'" :id="19" :alt="'TOOO'" />

    <overview-section>
      <!-- Navigation -------------->
      <overview-navigation
        :link="{ name: 'seasons' }"
        :text="'Season History'"
      />

      <!-- Context ---------------->
      <overview-context class="season-context">
        <div class="date">
          {{ season.date | moment("dddd, MMMM Do YYYY") }}
        </div>
      </overview-context>

      <!-- Spacer ------------------>
      <overview-spacer>
        <navigation-button
          v-if="season.id > 2"
          :to="{
            name: 'season',
            params: { id: season.id - 1, tab: this.$route.params.tab }
          }"
          :direction="'left'"
        />
        <v-spacer />
        <navigation-button
          :to="{
            name: 'season',
            params: { id: season.id + 1, tab: this.$route.params.tab },
            query: { ...this.$route.query }
          }"
          :direction="'right'"
        />
      </overview-spacer>

      <!-- Content ----------------->
      <overview-content-background>
        <overview-content class="season-name">
          Season {{ season.name }}
        </overview-content>
      </overview-content-background>
    </overview-section>
  </div>
</template>

<script>
export default {
  name: "SeasonOverviewSmAndUp",
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
