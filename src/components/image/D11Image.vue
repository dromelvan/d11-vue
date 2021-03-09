<template>
  <img
    v-if="fileName === null"
    :class="type + '-image ' + size"
    :src="`${baseURL}images/${type}/missing.png`"
  />
  <img
    v-else
    :class="type + '-image ' + size"
    :src="`${baseURL}images/${type}/${fileName}`"
  />
</template>

<script>
export default {
  name: "D11Image",
  data: () => ({
    baseURL: process.env.BASE_URL
  }),
  props: {
    fileName: {
      type: String,
      default: "missing.png"
    },
    type: String,
    size: {
      type: String,
      default: "default"
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  vertical-align: middle;
}

img.small {
  height: 60px;
}
</style>
