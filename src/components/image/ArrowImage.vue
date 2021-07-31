<template>
  <img
    v-if="direction === 'down'"
    class="arrow-down-image"
    src="@/assets/images/arrow-down.png"
  />
  <img v-else class="arrow-up-image" src="@/assets/images/arrow-up.png" />
</template>

<script>
export default {
  name: "ArrowImage",
  props: {
    direction: String
  },
  data: () => ({
    baseURL: process.env.BASE_URL
  })
};
</script>
<style lang="scss" scoped>
img {
  vertical-align: middle;
  margin-bottom: 3px;
}
</style>
