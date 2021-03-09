<template>
  <d11-image :type="'team'" :fileName="id + '.png'" :size="size" />
</template>

<script>
export default {
  name: "TeamImage",
  components: {
    D11Image: () => import("@/components/image/D11Image")
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
