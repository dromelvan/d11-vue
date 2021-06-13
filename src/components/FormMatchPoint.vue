<template>
  <v-avatar size="28" :class="pointType + ' index-' + formMatchPoint.index">
    <span class="white--text">{{ formMatchPoint.points }}</span>
  </v-avatar>
</template>

<script>
export default {
  name: "FormMatchPoint",
  props: {
    formMatchPoint: Object
  },
  computed: {
    pointType() {
      if (this.formMatchPoint.points > 0) {
        return "positive";
      } else if (this.formMatchPoint.points === 0) {
        return "neutral";
      } else {
        return "negative";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-avatar {
  font-weight: 600;
}
.v-avatar.positive {
  background-color: var(--v-success-darken2);
}
.v-avatar.neutral {
  background-color: var(--v-secondary-lighten1);
}
.v-avatar.negative {
  background-color: var(--v-error-darken2);
}
.v-avatar:not(.index-0) {
  margin-left: $d11-spacer;
}
</style>
