<template>
  <v-icon class="table-down-icon" />
</template>

<style lang="scss" scoped>
.table-down-icon {
  height: $d11-match-event-icon-width;
  width: $d11-match-event-icon-height;
  background: url("~@/assets/images/match-event-sprites.png")
    ($d11-match-event-icon-height * 4) * -1 $d11-match-event-icon-height * -1;
}
</style>
