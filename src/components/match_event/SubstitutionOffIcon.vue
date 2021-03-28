<template>
  <v-icon class="substitution-icon substitution-off-icon" />
</template>

<style lang="scss" scoped>
.substitution-icon.substitution-off-icon {
  height: $d11-match-event-icon-width;
  width: $d11-match-event-icon-height;
  background: url("~@/assets/images/match-event-sprites.png")
    $d11-match-event-icon-height * -1 $d11-match-event-icon-height * -1;
}
</style>
