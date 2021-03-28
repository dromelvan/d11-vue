<template>
  <v-icon class="card-icon red-card-icon" />
</template>

<style lang="scss" scoped>
.card-icon.red-card-icon {
  height: $d11-match-event-icon-width;
  width: $d11-match-event-icon-height;
  background: url("~@/assets/images/match-event-sprites.png")
    ($d11-match-event-icon-height * 2) * -1 $d11-match-event-icon-height * -1;
}
</style>
