<template>
  <div class="team-overview">
    <background-picture :type="'stadium'" :id="19" alt="TODO" />

    <overview-section>
      <!-- Navigation -------------->
      <overview-navigation
        :link="{
          name: 'season',
          params: { id: season.id, tab: 'premier-league-table' }
        }"
        :text="'Season ' + season.name"
      />

      <!-- Context ---------------->
      <overview-context class="match-context">
        <div class="established">Established {{ team.established }}</div>
        <v-icon medium class="overview-context-icon">mdi-stadium</v-icon>
        <div class="stadium">
          {{ team.stadium.name }}, {{ team.stadium.city }}
        </div>
        <div class="overview-context-link-container">
          <a
            class="overview-context-link team-link"
            target="_blank"
            :href="team.url"
          >
            Official Site
          </a>
        </div>
        <v-icon medium>mdi-chevron-right</v-icon>
      </overview-context>

      <!-- Spacer ------------------>
      <overview-spacer>
        <navigation-button
          v-if="season.id > 2"
          :to="{
            name: 'team',
            params: {
              id: team.id,
              seasonId: season.id - 1,
              tab: this.$route.params.tab
            }
          }"
          :direction="'left'"
        />
        <v-spacer />
        <navigation-button
          :to="{
            name: 'team',
            params: {
              id: team.id,
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
          <div class="team">
            <team-image :size="'small'" :id="team.id" />
            {{ team.name }}
          </div>
        </overview-content>
      </overview-content-background>
    </overview-section>
  </div>
</template>

<script>
export default {
  name: "TeamOverviewSmAndUp",
  props: {
    team: Object,
    season: Object,
    teamSeasonStat: Object
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
    TeamImage: () => import("@/components/image/TeamImage")
  }
};
</script>
