<template>
  <div class="match-overview">
    <background-picture :type="'stadium'" :id="19" :alt="match.stadium.name" />

    <overview-section>
      <!-- Navigation -------------->
      <overview-navigation
        :link="{ name: 'matchWeek', params: { id: match.matchWeek.id } }"
        :text="'Match Week ' + match.matchWeek.matchWeekNumber"
      />

      <!-- Context ---------------->
      <overview-context class="match-context">
        <div class="datetime">
          {{ match.datetime | moment("dddd, MMMM Do YYYY") }}
        </div>
        <v-icon medium class="overview-context-icon">mdi-stadium</v-icon>
        <div class="stadium">
          {{ match.stadium.name }}, {{ match.stadium.city }}
        </div>
        <div class="overview-context-link-container">
          <a
            class="overview-context-link whoscored-link"
            target="_blank"
            :href="
              'https://www.whoscored.com/Matches/' + match.whoscoredId + '/'
            "
            >View on WhoScored</a
          >
        </div>
        <v-icon medium>mdi-chevron-right</v-icon>
      </overview-context>

      <!-- Spacer ------------------>
      <overview-spacer />

      <!-- Time -------------------->
      <v-container class="time">
        <span class="kick-off"
          >Kick Off {{ match.datetime | moment("HH:mm") }}</span
        >
      </v-container>

      <overview-content-background>
        <!-- Match result ------------>
        <match-result-sm-and-up :match="match" />

        <!-- Match goals ------------->
        <match-goals-sm-and-up :match="match" />
      </overview-content-background>
    </overview-section>
  </div>
</template>

<script>
export default {
  name: "MatchOverviewSmAndUp",
  props: {
    match: Object
  },
  components: {
    BackgroundPicture: () => import("@/components/image/BackgroundImage"),
    OverviewSection: () => import("@/components/overview/OverviewSection"),
    OverviewNavigation: () =>
      import("@/components/overview/OverviewNavigation"),
    OverviewContext: () => import("@/components/overview/OverviewContext"),
    OverviewSpacer: () => import("@/components/overview/OverviewSpacer"),
    OverviewContentBackground: () =>
      import("@/components/overview/OverviewContentBackground"),
    MatchResultSmAndUp: () => import("@/views/match/MatchResultSmAndUp"),
    MatchGoalsSmAndUp: () => import("@/views/match/MatchGoalsSmAndUp")
  }
};
</script>

<style lang="scss" scoped>
.time {
  display: flex;
  padding: 0;

  span {
    margin: 0 auto;
  }
}
</style>
