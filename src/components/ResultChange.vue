<template>
  <span class="result-change" v-if="difference != 0">
    <arrow-image :direction="direction" v-if="team == 'away'" />
    <template v-if="difference > 0">+</template>
    {{ difference }}
    <template v-if="mdAndUp">{{ name }}</template>
    <template v-else>{{ name.charAt(0) }}</template>
    <arrow-image :direction="direction" v-if="team == 'home'" />
  </span>
</template>

<script>
export default {
  name: "ResultChange",
  props: {
    team: String,
    name: {
      type: String,
      default: "Goals"
    },
    current: Number,
    previous: Number
  },
  components: {
    ArrowImage: () => import("@/components/image/ArrowImage")
  },
  computed: {
    difference: function() {
      return this.current - this.previous;
    },
    direction: function() {
      if (this.current > this.previous) {
        return "up";
      } else if (this.previous > this.current) {
        return "down";
      }
      return null;
    }
  }
};
</script>

<style lang="scss" scoped>
.result-change {
  font-weight: 600;
}
</style>
