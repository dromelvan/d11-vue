<template>
  <div class="d11-team-overview">
    <background-picture :type="'stadium'" :id="19" alt="TODO" />

    <overview-section>
      <!-- Navigation -------------->
      <overview-navigation
        :link="{
          name: 'season',
          params: { id: season.id, tab: 'd11-league-table' }
        }"
        :text="'Season ' + season.name"
      />

      <!-- Context ---------------->
      <overview-context class="d11-team-context">
        <div>Overview</div>
      </overview-context>

      <!-- Spacer ------------------>
      <overview-spacer>
        <navigation-button
          v-if="season.id > 2"
          :to="{
            name: 'd11Team',
            params: {
              id: d11Team.id,
              seasonId: season.id - 1,
              tab: this.$route.params.tab
            }
          }"
          :direction="'left'"
        />
        <v-spacer />
        <navigation-button
          v-if="season.id < this.currentSeason().id"
          :to="{
            name: 'd11Team',
            params: {
              id: d11Team.id,
              seasonId: season.id + 1,
              tab: this.$route.params.tab
            }
          }"
          :direction="'right'"
        />
      </overview-spacer>

      <!-- Content ----------------->
      <overview-content-background>
        <overview-content class="season-name">
          <div class="d11-team">
            <d11-team-image :size="'small'" :id="d11Team.id" />
            {{ d11Team.name }}
          </div>
        </overview-content>
      </overview-content-background>
    </overview-section>
  </div>
</template>

<script>
export default {
  name: "D11TeamOverviewSmAndUp",
  props: {
    d11Team: Object,
    season: Object,
    d11TeamSeasonStat: Object
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
    OverviewContent: () => import("@/components/overview/OverviewContent"),
    D11TeamImage: () => import("@/components/image/D11TeamImage")
  }
};
</script>
