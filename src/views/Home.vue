<template>
  <div class="home">
    <!-- Header -------------------------------->
    <d11-header
      :backgroundPictureType="'stadium'"
      :backgroundPictureId="19"
      :backgroundPictureAlt="'TODO'"
    >
      <div class="hero-unit">
        <div>
          <h1>This is Drömelvan</h1>
          <p>
            The competition for those whose knowledge of football is vastly
            greater than that of the average person.
          </p>
          <v-btn dark :to="{ name: 'rules' }">Learn More »</v-btn>
        </div>
      </div>
    </d11-header>

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
    D11Header: () => import("@/components/header/D11Header"),
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

<style lang="scss" scoped>
.home {
  .hero-unit {
    display: flex;
    align-items: center;
    height: 100%;
    text-shadow: 2px 2px black;

    h1 {
      font-size: 63px;
      font-weight: 500;
      font-family: Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }

    p {
      margin-top: $d11-large-spacer;
      margin-left: $d11-large-spacer;
    }
  }
}
</style>

<style lang="scss">
.home {
  .background-picture {
    .background-img {
      height: 270px !important;
    }
  }

  .background-picture:after {
    height: 270px !important;
  }

  .header-section {
    height: 270px !important;
  }
}
</style>
