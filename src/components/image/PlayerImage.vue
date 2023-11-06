<template>
  <external-d11-image :type="'player'" :id="id" :size="size" />
</template>

<script>
export default {
  name: "PlayerImage",
  components: {
    ExternalD11Image: () => import("@/components/image/ExternalD11Image")
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: "default"
    }
  }
};
</script>
