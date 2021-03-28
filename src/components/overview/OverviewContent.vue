<template>
  <v-container class="overview-content-container">
    <div class="overview-content" v-bind:class="{ vertical: vertical }">
      <slot></slot>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "OverviewContent",
  props: {
    vertical: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.overview-content-container {
  .overview-content {
    padding: $d11-spacer;
    background: rgb(0, 0, 0, 0.5);
    display: flex;

    .name {
      font-size: 1.75em;
      font-weight: 600;
    }

    .emphasised {
      background: var(--v-highlight-base);
    }

    .previous-btn,
    .next-btn {
      font-size: 1.8em;
      align-self: center;
      color: white;
    }

    .previous-btn {
      margin-right: $d11-spacer;
    }

    .next-btn {
      margin-left: auto;
    }
  }

  .overview-content.vertical {
    flex-direction: column;
    padding-right: 0;
  }
}

.overview-content-background {
  .overview-content-container {
    padding-top: 0px;
    padding-bottom: 0px;
    .overview-content {
      font-weight: 600;
      line-height: 2.3em;
      font-size: 1.75em;
      padding: 0 0.25em;
      background: var(--v-primary-base);
    }
  }
}

.v-application-xs {
  .overview-content-background {
    .overview-content-container {
      .overview-content {
        font-size: 1.5em;
        font-weight: 600;
        line-height: inherit;
        max-height: none;
      }
      .overview-content:not(.vertical) {
        padding: 0.25em 0.25em;
      }
    }
  }
}
</style>
