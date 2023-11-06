<template>
  <external-d11-image :type="'country'" :id="iso" :size="size" />
</template>

<script>
export default {
  name: "CountryImage",
  components: {
    ExternalD11Image: () => import("@/components/image/ExternalD11Image")
  },
  props: {
    iso: {
      type: String,
      default: "missing"
    },
    size: {
      type: String,
      default: "default"
    }
  }
};
</script>
