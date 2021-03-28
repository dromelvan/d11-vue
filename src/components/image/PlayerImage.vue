<template>
  <d11-image :type="'player'" :fileName="fileName" :size="size" />
</template>

<script>
export default {
  name: "PlayerImage",
  components: {
    D11Image: () => import("@/components/image/D11Image")
  },
  data: () => ({
    baseURL: process.env.BASE_URL
  }),
  props: {
    fileName: {
      type: String,
      default: "missing.png"
    },
    size: {
      type: String,
      default: "default"
    }
  }
};
</script>
