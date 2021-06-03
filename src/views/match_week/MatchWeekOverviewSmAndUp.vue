<template>
  <div class="match-week-overview">
    <background-picture :type="'stadium'" :id="19" :alt="'TOOO'" />

    <overview-section>
      <!-- Navigation -------------->
      <overview-navigation
        :link="{
          name: 'season',
          params: { id: matchWeek.season.id, tab: 'match-weeks' }
        }"
        :text="'Season ' + matchWeek.season.name"
      />

      <!-- Context ---------------->
      <overview-context class="match-week-context">
        <div class="date">
          {{ matchWeek.date | moment("dddd, MMMM Do YYYY") }}
        </div>
      </overview-context>

      <!-- Spacer ------------------>
      <overview-spacer>
        <navigation-button
          v-if="matchWeek.id > 2"
          :to="{
            name: 'matchWeek',
            params: { id: matchWeek.id - 1, tab: this.$route.params.tab }
          }"
          :direction="'left'"
        />
        <v-spacer />

        <navigation-button
          :to="{
            name: 'matchWeek',
            params: { id: matchWeek.id + 1, tab: this.$route.params.tab }
          }"
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
