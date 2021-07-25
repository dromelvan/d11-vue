<template>
  <div class="d11-teams">
    <!-- Header -------------------------------->
    <d11-header
      :backgroundPictureType="'stadium'"
      :backgroundPictureId="19"
      :backgroundPictureAlt="'TODO'"
      :parentLink="{
        text: season ? 'Season ' + season.name : '',
        name: 'season',
        params: { id: season ? season.id : 0 }
      }"
      :previousLink="{
        name: 'd11Teams',
        params: {
          seasonId: season ? season.id - 1 : 0
        },
        show: season && season.id > minSeasonId()
      }"
      :nextLink="{
        name: 'd11Teams',
        params: {
          seasonId: season ? season.id + 1 : 0
        },
        show: season && season.id < maxSeasonId()
      }"
    >
      <template v-if="season">
        <div class="header-title">
          <h1>D11 Teams</h1>
        </div>
        <div class="header-subtitle">
          <h4>Season {{ season.name }}</h4>
        </div>
      </template>
    </d11-header>

    <content-section>
      <v-container class="d11-teams-container">
        <v-row>
          <d11-team-card
            v-for="d11Team in d11Teams"
            :key="d11Team.id"
            :d11Team="d11Team"
            :season="season"
          />
        </v-row>
      </v-container>
    </content-section>
  </div>
</template>

<script>
import SeasonService from "@/services/season.service";
import D11TeamService from "@/services/d11Team.service";

export default {
  name: "D11Teams",
  data: () => ({
    season: null,
    d11Teams: null
  }),
  components: {
    D11Header: () => import("@/components/header/D11Header"),
    ContentSection: () => import("@/components/ContentSection"),
    D11TeamCard: () => import("@/views/d11_team/D11TeamCard")
  },
  methods: {
    getSeason: function() {
      let seasonId =
        this.$route.params.seasonId === "current"
          ? this.currentSeason().id
          : this.$route.params.seasonId;
      this.d11Teams = null;
      SeasonService.getSeason(seasonId).then(result => {
        this.season = result;
        D11TeamService.getD11TeamsBySeason(seasonId).then(result => {
          this.d11Teams = result;
        });
      });
    }
  },
  mounted() {
    this.getSeason();
  },
  watch: {
    $route() {
      if (
        this.season == null ||
        this.$route.params.seasonId != this.season.id
      ) {
        this.getSeason();
      }
    }
  }
};
</script>
