<template>
  <div class="match-week-overview">
    <background-picture :type="'stadium'" :id="19" :alt="'TOOO'" />

    <overview-section>
      <!-- Navigation -------------->
      <overview-navigation
        :link="{
          name: 'premierLeague',
          params: { id: matchWeek.premierLeague.id }
        }"
        :text="'Premier League ' + matchWeek.season.name"
      />

      <!-- Context ---------------->
      <overview-context class="match-week-context">
        <div class="date">
          {{ matchWeek.date | moment("dddd, MMMM Do YYYY") }}
        </div>
        <div class="overview-context-link-container">
          <router-link
            :to="{
              name: 'd11MatchWeek',
              params: { id: matchWeek.d11MatchWeek.id }
            }"
          >
            D11 Match day {{ matchWeek.d11MatchWeek.matchWeekNumber }}
          </router-link>
        </div>
        <v-icon medium>mdi-chevron-right</v-icon>
      </overview-context>

      <!-- Spacer ------------------>
      <overview-spacer>
        <navigation-button
          v-if="matchWeek.id > 2"
          :to="{ name: 'matchWeek', params: { id: matchWeek.id - 1 } }"
          :direction="'left'"
        />
        <v-spacer />

        <navigation-button
          :to="{ name: 'matchWeek', params: { id: matchWeek.id + 1 } }"
          :direction="'right'"
        />
      </overview-spacer>

      <overview-content-background>
        <overview-content class="match-week-name">
          Match Week {{ matchWeek.matchWeekNumber }} {{ matchWeek.season.name }}
        </overview-content>
      </overview-content-background>
    </overview-section>
  </div>
</template>

<script>
export default {
  name: "MatchWeekOverviewSmAndUp",
  props: {
    matchWeek: Object
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
