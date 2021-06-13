<template>
  <v-icon class="card-icon yellow-card-icon" />
</template>

<style lang="scss" scoped>
.card-icon.yellow-card-icon {
  height: $d11-match-event-icon-width;
  width: $d11-match-event-icon-height;
  background: url("~@/assets/images/match-event-sprites.png")
    ($d11-match-event-icon-height * 2) * -1 0;
}

.v-list-item {
  .card-icon.yellow-card-icon {
    margin-bottom: 2px;
  }
}
</style>
