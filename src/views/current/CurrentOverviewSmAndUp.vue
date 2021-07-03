<template>
  <div>
    <background-picture :type="'stadium'" :id="19" alt="TODO" />

    <overview-section>
      <!-- Navigation -------------->
      <overview-navigation
        :link="{
          name: 'season',
          params: { id: 2, tab: 'd11-league-table' }
        }"
        :text="'Season'"
      />

      <!-- Context ---------------->
      <overview-context class="current-context">
        <div>Overview</div>
      </overview-context>

      <!-- Spacer ------------------>
      <overview-spacer />

      <!-- Content ----------------->
      <overview-content-background>
        <overview-content>
          <div class="current">
            Current Matches
          </div>
        </overview-content>
      </overview-content-background>
    </overview-section>
  </div>
</template>

<script>
export default {
  name: "CurrentOverviewSmAndUp",
  components: {
    BackgroundPicture: () => import("@/components/image/BackgroundImage"),
    OverviewSection: () => import("@/components/overview/OverviewSection"),
    OverviewNavigation: () =>
      import("@/components/overview/OverviewNavigation"),
    OverviewContext: () => import("@/components/overview/OverviewContext"),
    OverviewSpacer: () => import("@/components/overview/OverviewSpacer"),
    OverviewContentBackground: () =>
      import("@/components/overview/OverviewContentBackground"),
    OverviewContent: () => import("@/components/overview/OverviewContent")
  }
};
</script>
