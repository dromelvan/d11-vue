<template>
  <div>
    <overview-content class="d11-match-result">
      <div
        class="d11-team home"
        v-if="mdAndUp || d11Match.homeD11Team.name.length < 20"
      >
        <d11-team-image :size="'small'" :id="d11Match.homeD11Team.id" />
        {{ d11Match.homeD11Team.name }}
      </div>
      <div class="d11-team home" v-else>
        <d11-team-image :size="'small'" :id="d11Match.homeD11Team.id" />
        {{ d11Match.homeD11Team.shortName }}
      </div>
      <div class="d11-points home" v-if="!pending(d11Match.status)">
        ({{ d11Match.homeTeamPoints }})
      </div>
      <div class="highlight" v-if="!pending(d11Match.status)">
        <div class="score">
          {{ d11Match.homeTeamGoals }} -
          {{ d11Match.awayTeamGoals }}
        </div>
      </div>
      <div v-else>
        <div class="score">vs</div>
      </div>
      <div class="d11-points away" v-if="!pending(d11Match.status)">
        ({{ d11Match.awayTeamPoints }})
      </div>
      <div
        class="d11-team away"
        v-if="mdAndUp || d11Match.awayD11Team.name.length < 20"
      >
        {{ d11Match.awayD11Team.name }}
        <d11-team-image :size="'small'" :id="d11Match.awayD11Team.id" />
      </div>
      <div class="d11-team away" v-else>
        {{ d11Match.awayD11Team.shortName }}
        <d11-team-image :size="'small'" :id="d11Match.awayD11Team.id" />
      </div>
    </overview-content>

    <v-container
      class="time"
      v-bind:class="{ active: this.active(d11Match.status) }"
      v-if="!this.pending(d11Match.status)"
    >
      <span class="elapsed">{{ this.elapsedText(d11Match.elapsed) }}</span>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "D11MatchMatchResultSmAndUp",
  components: {
    OverviewContent: () => import("@/components/overview/OverviewContent"),
    D11TeamImage: () => import("@/components/image/D11TeamImage")
  },
  props: {
    d11Match: Object
  }
};
</script>

<style lang="scss" scoped>
.d11-match-result {
  .d11-team,
  .goals {
    width: 50%;
  }

  .d11-team.home,
  .goals.away {
    text-align: left;
  }

  .d11-points.home {
    margin-left: auto;
    padding-right: $d11-spacer;
  }

  .d11-points.away {
    margin-right: auto;
    padding-left: $d11-spacer;
  }

  .score {
    width: 100px;
    text-align: center;
  }

  .d11-team.away,
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
