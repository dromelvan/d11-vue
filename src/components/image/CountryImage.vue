<template>
  <d11-image :type="'country'" :fileName="iso + '.png'" :size="size" />
</template>

<script>
export default {
  name: "CountryImage",
  components: {
    D11Image: () => import("@/components/image/D11Image")
  },
  props: {
    iso: {
      type: String,
      default: "_unknown"
    },
    size: {
      type: String,
      default: "default"
    }
  }
};
</script>
