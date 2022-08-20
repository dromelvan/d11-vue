<template>
  <v-icon class="goal-icon" />
</template>

<style lang="scss" scoped>
.goal-icon {
  height: $d11-match-event-icon-width;
  width: $d11-match-event-icon-height;
  background: url("~@/assets/images/match-event-sprites.png") 0px
    $d11-match-event-icon-height * -1;
}

.goal-light {
  .goal-icon {
    background: url("~@/assets/images/match-event-sprites.png") 0px 0px;
  }
}
</style>
