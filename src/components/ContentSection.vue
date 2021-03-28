<template>
  <section class="content-section">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: "ContentSection"
};
</script>

<style lang="scss" scoped>
.content-section {
  position: relative;
  z-index: 1;
}
</style>
