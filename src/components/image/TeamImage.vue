<template>
  <external-d11-image :type="'team'" :id="id" :size="size" />
</template>

<script>
export default {
  name: "TeamImage",
  components: {
    ExternalD11Image: () => import("@/components/image/ExternalD11Image")
  },
  props: {
    id: {
      type: Number,
      default: 1
    },
    size: {
      type: String,
      default: "default"
    }
  }
};
</script>
