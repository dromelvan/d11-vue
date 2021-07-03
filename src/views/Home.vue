<template>
  <div class="current">
    <current-overview-sm-and-up v-if="smAndUp" />

    <content-section>
      <v-container class="tabs-container">
        <v-tabs v-model="tab">
          <v-tab class="matches-tab" href="#matches">
            Current Matches
          </v-tab>
          <v-tab class="d11.matches-tab" href="#d11Matches">
            Current D11 Matches
          </v-tab>
          <v-tabs-items :value="tab">
            <v-tab-item value="matches">
              <lazy-match-list
                v-for="date in Object.keys(matchesByDate.matches)"
                :key="date"
                :date="date"
                :view="'current'"
                :matchIds="matchesByDate.matches[date]"
              />
            </v-tab-item>
            <v-tab-item value="d11Matches">
              <lazy-d11-match-list
                v-for="date in Object.keys(d11MatchesByDate.d11Matches)"
                :key="date"
                :date="date"
                :view="'current'"
                :d11MatchIds="d11MatchesByDate.d11Matches[date]"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-container>
    </content-section>
  </div>
</template>

<script>
import MatchService from "@/services/match.service";
import D11MatchService from "@/services/d11Match.service";

export default {
  name: "Home",
  data: () => ({
    tab: "matches",
    matchesByDate: {
      matches: []
    },
    d11MatchesByDate: {
      d11Matches: []
    }
  }),
  components: {
    CurrentOverviewSmAndUp: () =>
      import("@/views/current/CurrentOverviewSmAndUp"),
    ContentSection: () => import("@/components/ContentSection"),
    LazyMatchList: () => import("@/views/match/LazyMatchList"),
    LazyD11MatchList: () => import("@/views/d11_match/LazyD11MatchList")
  },
  mounted() {
    MatchService.findCurrentMatches().then(result => {
      this.matchesByDate = result;
    });
    D11MatchService.findCurrentD11Matches().then(result => {
      this.d11MatchesByDate = result;
    });
  }
};
</script>
