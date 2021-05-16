<template>
  <div class="premier-league-overview">
    <background-picture :type="'stadium'" :id="19" :alt="'TOOO'" />

    <overview-section>
      <!-- Navigation -------------->
      <overview-navigation
        :link="{
          name: 'season',
          params: { id: premierLeague.season.id }
        }"
        :text="'Season ' + premierLeague.season.name"
      />

      <!-- Context ---------------->
      <overview-context class="premier-league-context">
        <div class="date">
          {{ premierLeague.season.date | moment("dddd, MMMM Do YYYY") }}
        </div>
        <div class="overview-context-link-container">
          <router-link
            :to="{
              name: 'd11League',
              params: { id: premierLeague }
            }"
          >
            D11 League {{ premierLeague.season.name }} (TODO)
          </router-link>
        </div>
        <v-icon medium>mdi-chevron-right</v-icon>
      </overview-context>

      <!-- Spacer ------------------>
      <overview-spacer>
        <navigation-button
          v-if="premierLeague.id > 2"
          :to="{
            name: 'premierLeague',
            params: { id: premierLeague.id - 1, tab: this.$route.params.tab }
          }"
          :direction="'left'"
        />
        <v-spacer />
        <navigation-button
          :to="{
            name: 'premierLeague',
            params: { id: premierLeague.id + 1, tab: this.$route.params.tab },
            query: { ...this.$route.query }
          }"
          :direction="'right'"
        />
      </overview-spacer>

      <overview-content-background>
        <overview-content class="premier-league-name">
          Premier League {{ premierLeague.season.name }}
        </overview-content>
      </overview-content-background>
    </overview-section>
  </div>
</template>

<script>
export default {
  name: "PremierLeagueOverviewSmAndUp",
  props: {
    premierLeague: Object
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
