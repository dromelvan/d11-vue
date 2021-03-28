<template>
  <v-list-item :ripple="false" :to="to" link>
    <v-list-item-content>
      <slot></slot>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "ListContainerItem",
  props: {
    to: {
      type: Object,
      default: function() {
        return { name: "home" };
      }
    }
  }
};
</script>
