<template>
  <v-container class="list-container" v-bind:class="{ columns: columns }">
    <slot name="header"></slot>
    <v-divider />
    <v-list class="list-container-list" flat style="padding-top: 0">
      <slot></slot>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: "ListContainer",
  props: {
    columns: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
// Not scoping this in order to make it easier to use whereever we want.
.list-container {
  padding-top: 0;

  .list-container-header {
    display: flex;
    padding: 0;
    //padding-bottom: $d11-spacer;
    line-height: 2.2em;
    font-weight: 600;
  }

  .list-container-header > * {
    text-align: center;
  }

  .v-list-item {
    padding: 0;
  }

  .main-item {
    margin-right: auto;
  }

  .after-main-item {
    margin-left: auto;
  }

  .v-list-item__content {
    padding: 0;

    .v-list-item__title {
      display: flex;
      line-height: unset;
      align-items: center;

      .emphasised {
        font-weight: 600;
      }
    }

    .v-list-item__title.vertical {
      display: unset;
    }

    .v-list-item__title > * {
      //min-width: 3.8em;
      text-align: center;
    }
  }

  .v-list-item__content > * {
    line-height: unset;
  }
}

//.list-container.columns {
//  .list-container-header {
//    padding-bottom: 0;
//  }
//}

.v-tabs-items {
  .list-container:first-child {
    padding-top: $d11-large-spacer;
  }
}

.v-application-xs {
  .list-container {
    .list-container-header > *,
    .v-list-item {
      padding-left: $d11-spacer;
      padding-right: $d11-spacer;
    }
  }
}
</style>
