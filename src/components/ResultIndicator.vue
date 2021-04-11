<template>
  <v-avatar
    :class="'result-' + result.toLowerCase() + ' index-' + formMatchPoint.index"
    size="28"
  >
    <span class="white--text">{{ result }}</span>
  </v-avatar>
</template>

<script>
export default {
  name: "ResultIndicator",
  props: {
    formMatchPoint: Object
  },
  computed: {
    result() {
      if (this.formMatchPoint.points === 3) {
        return "W";
      } else if (this.formMatchPoint.points === 1) {
        return "D";
      } else {
        return "L";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-avatar {
  font-weight: 600;
}
.v-avatar.result-w {
  background-color: var(--v-success-darken2);
}
.v-avatar.result-d {
  background-color: var(--v-secondary-lighten1);
}
.v-avatar.result-l {
  background-color: var(--v-error-darken2);
}
.v-avatar:not(.index-0) {
  margin-left: $d11-spacer;
}
</style>
