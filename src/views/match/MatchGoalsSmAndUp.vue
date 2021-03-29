<template>
  <v-container
    class="match-goals-container"
    v-if="match.homeTeamGoals > 0 || match.awayTeamGoals > 0"
  >
    <div class="match-goals">
      <div class="goals home">
        <goal
          v-for="goal in match.goals.filter(goal => {
            return goal.team.id == match.homeTeam.id;
          })"
          :key="goal.id"
          :goal="goal"
          :homeTeamGoal="true"
        />
      </div>
      <div class="goals away">
        <goal
          v-for="goal in match.goals.filter(goal => {
            return goal.team.id == match.awayTeam.id;
          })"
          :key="goal.id"
          :goal="goal"
          :homeTeamGoal="false"
        />
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "MatchGoalsSmAndUp",
  components: {
    Goal: () => import("@/components/match_event/Goal")
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
    .goals {
      width: 50%;
    }

    .goals.home {
      text-align: right;
      padding-right: 3.5em;
    }

    .goals.away {
      text-align: left;
      padding-left: 3.5em;
    }
  }
}
</style>
