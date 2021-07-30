<template>
  <div class="goal-container">
    <div class="goal home" v-if="homeTeamGoal">
      <span class="goal-text" v-if="smAndUp"
        >{{ goal.player.name }} {{ goal.time }}'</span
      >
      <span class="goal-text" v-if="xs"
        >{{ goal.player.shortName }} {{ goal.time }}'</span
      >
      <span class="goal-text" v-if="goal.penalty && smAndUp"> (pen)</span>
      <span class="goal-text" v-if="goal.penalty && xs"> (p)</span>
      <span class="goal-text" v-if="goal.ownGoal"> (og)</span>
      <own-goal-icon v-if="goal.ownGoal" />
      <goal-icon v-else />
    </div>
    <div class="goal away" v-else>
      <own-goal-icon v-if="goal.ownGoal" />
      <goal-icon v-else />
      <span class="goal-text" v-if="goal.penalty && smAndUp">(pen) </span>
      <span class="goal-text" v-if="goal.penalty && xs">(p) </span>
      <span class="goal-text" v-if="goal.ownGoal">(og) </span>
      <span class="goal-text" v-if="smAndUp"
        >{{ goal.time }}' {{ goal.player.name }}</span
      >
      <span class="goal-text" v-if="xs"
        >{{ goal.time }}' {{ goal.player.shortName }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Goal",
  props: {
    goal: Object,
    homeTeamGoal: Boolean
  },
  components: {
    GoalIcon: () => import("@/components/match_event/GoalIcon"),
    OwnGoalIcon: () => import("@/components/match_event/OwnGoalIcon")
  }
};
</script>

<style lang="scss" scoped>
.goal-container {
  line-height: 1.5em;
  vertical-align: middle;
}

.goal-text {
  vertical-align: middle;
}

.home {
  .goal-icon {
    margin-left: 0.2em;
  }
}

.away {
  .goal-icon {
    margin-right: 0.2em;
  }
}
</style>
