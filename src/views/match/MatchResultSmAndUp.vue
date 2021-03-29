<template>
  <div>
    <overview-content class="match-result">
      <div class="team home" v-if="mdAndUp || match.homeTeam.name.length < 20">
        <team-image :size="'small'" :id="match.homeTeam.id" />
        {{ match.homeTeam.name }}
      </div>
      <div class="team home" v-else>
        <team-image :size="'small'" :id="match.homeTeam.id" />
        {{ match.homeTeam.shortName }}
      </div>
      <div class="emphasised" v-if="!pending(match.status)">
        <div class="score">
          {{ match.homeTeamGoals }} - {{ match.awayTeamGoals }}
        </div>
      </div>
      <div v-else>
        <div class="score">vs</div>
      </div>
      <div class="team away" v-if="mdAndUp || match.awayTeam.name.length < 20">
        {{ match.awayTeam.name }}
        <team-image :size="'small'" :id="match.awayTeam.id" />
      </div>
      <div class="team away" v-else>
        {{ match.awayTeam.shortName }}
        <team-image :size="'small'" :id="match.awayTeam.id" />
      </div>
    </overview-content>

    <v-container
      class="time"
      v-bind:class="{ active: this.active(match.status) }"
      v-if="!this.pending(match.status)"
    >
      <span class="elapsed">{{ this.elapsedText(match.elapsed) }}</span>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "MatchMatchResult",
  components: {
    OverviewContent: () => import("@/components/overview/OverviewContent"),
    TeamImage: () => import("@/components/image/TeamImage")
  },
  props: {
    match: Object
  }
};
</script>

<style lang="scss" scoped>
.match-goals-container {
  padding-top: 0;
  padding-bottom: 0;

  .match-goals {
    display: flex;
  }
}

.match-result,
.match-goals {
  .team,
  .goals {
    width: 50%;
  }

  .team.home,
  .goals.away {
    text-align: left;
  }

  .score {
    width: 100px;
    text-align: center;
  }

  .team.away,
  .goals.home {
    text-align: right;
  }

  .goals.home {
    padding-right: 3.5em;
  }
  .goals.away {
    padding-left: 3.5em;
  }
}

.time {
  display: flex;
  padding: 0;

  span {
    margin: 0 auto;
  }
}
</style>
