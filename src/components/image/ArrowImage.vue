<template>
  <img
    :class="'arrow-' + direction + '-image '"
    :src="`${baseURL}img/icons/arrow-${direction}.png`"
  />
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
