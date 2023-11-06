<template>
  <img
    :class="type + '-image ' + size"
    :src="`${baseURL}${type}/${id}.png`"
    :onerror="onError"
  />
</template>

<script>
export default {
  name: "ExternalD11Image",
  data: () => ({
    baseURL: process.env.VUE_APP_IMAGE_BASE_URL
  }),
  props: {
    id: {
      type: [String, Number],
      default: "missing"
    },
    type: String,
    size: {
      type: String,
      default: "default"
    }
  },
  computed: {
    onError() {
      return "this.src='" + this.baseURL + this.type + "/missing.png'";
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  vertical-align: middle;
}

img.large {
  height: 200px;
}

img.medium {
  height: 128px;
}

img.small {
  height: 60px;
}

img.tiny {
  height: 32px;
}

img.icon {
  height: 16px;
}
</style>
