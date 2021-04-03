<template>
  <v-lazy
    class="match-lazy"
    v-model="visible"
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
  >
    <v-list-item-title v-if="match" class="match">
      <div class="kickoff">Kick Off {{ match.datetime | moment("HH:mm") }}</div>
      <div class="team home">
        {{ match.homeTeam.name }}
      </div>
      <div class="image home">
        <team-image :type="'team'" :size="'tiny'" :id="match.homeTeam.id" />
      </div>
      <div class="score">
        <template v-if="this.pending(match.status)">vs</template>
        <template v-else
          >{{ match.homeTeamGoals }}-{{ match.awayTeamGoals }}</template
        >
      </div>
      <div class="image home">
        <team-image :type="'team'" :size="'tiny'" :id="match.awayTeam.id" />
      </div>
      <div class="team away">
        {{ match.awayTeam.name }}
      </div>
      <div class="elapsed">
        <elapsed
          v-if="this.active(match.status)"
          :elapsedTime="this.match.elapsed"
        />
        <template
          v-if="this.fullTime(match.status) || this.finished(match.status)"
        >
          Full Time
        </template>
      </div>
    </v-list-item-title>
  </v-lazy>
</template>

<script>
export default {
  name: "MatchWeekMatchSmAndUp",
  data: () => ({
    match: null,
    visible: false
  }),
  components: {
    TeamImage: () => import("@/components/image/TeamImage"),
    Elapsed: () => import("@/components/Elapsed")
  },
  props: {
    matchId: Number
  },
  watch: {
    visible: function() {
      new this.$d11BootApi.MatchApi()
        .findMatchById(this.matchId)
        .then(result => (this.match = result));
    }
  }
};
</script>

<style lang="scss" scoped>
.match {
  .kickoff,
  .elapsed {
    min-width: 7em;
  }

  .kickoff {
    text-align: left;
  }

  .elapsed {
    text-align: right;
    .progress {
      font-size: 0.6em;
    }
  }

  .team {
    min-width: 11.5em;
  }
  .team.home {
    margin-left: auto;
    text-align: right;
  }

  .team.away {
    margin-right: auto;
    text-align: left;
  }

  .image {
    padding: 0 $d11-spacer;
  }

  .score {
    min-width: 2em;
  }
}
</style>
