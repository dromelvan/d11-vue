<template>
  <div class="d11-match-overview">
    <background-picture :type="'stadium'" :id="19" alt="TODO" />

    <overview-section>
      <!-- Navigation -------------->
      <overview-navigation
        :link="{
          name: 'matchWeek',
          params: { id: d11Match.matchWeek.id, tab: 'd11-matches' }
        }"
        :text="'Match Week ' + d11Match.matchWeek.matchWeekNumber"
      />

      <!-- Context ---------------->
      <overview-context class="d11-match-context">
        <div class="datetime">
          {{ d11Match.datetime | moment("dddd, MMMM Do YYYY") }}
        </div>
      </overview-context>

      <!-- Spacer ------------------>
      <overview-spacer />

      <!-- Time -------------------->
      <v-container class="time">
        <span class="kick-off"
          >Kick Off {{ d11Match.datetime | moment("HH:mm") }}</span
        >
      </v-container>

      <overview-content-background>
        <!-- Match result ------------>
        <d11-match-result-sm-and-up :d11Match="d11Match" />
      </overview-content-background>
    </overview-section>
  </div>
</template>

<script>
export default {
  name: "D11MatchOverviewSmAndUp",
  props: {
    d11Match: Object
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
    D11MatchResultSmAndUp: () =>
      import("@/views/d11_match/D11MatchResultSmAndUp")
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
