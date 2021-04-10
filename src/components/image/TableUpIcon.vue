<template>
  <v-icon class="table-up-icon" />
</template>

<style lang="scss" scoped>
.table-up-icon {
  height: $d11-match-event-icon-width;
  width: $d11-match-event-icon-height;
  background: url("~@/assets/images/match-event-sprites.png")
    ($d11-match-event-icon-height * 4) * -1 0;
}
</style>
