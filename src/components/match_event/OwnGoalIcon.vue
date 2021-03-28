<template>
  <v-icon class="goal-icon own-goal-icon" />
</template>

<style lang="scss" scoped>
.goal-icon.own-goal-icon {
  height: $d11-match-event-icon-width;
  width: $d11-match-event-icon-height;
  background: url("~@/assets/images/match-event-sprites.png") 0px
    ($d11-match-event-icon-height * 2) * -1;
}
</style>
