<template>
  <list-container>
    <template v-slot:header>
      <div class="d11-match-week-date list-container-header">
        <template v-if="date === 'Postponed'">
          {{ date }}
        </template>
        <template v-else>
          {{ date | moment("dddd, MMMM Do YYYY") }}
        </template>
      </div>
    </template>
    <div v-for="d11MatchId in d11MatchIds" :key="d11MatchId">
      <list-container-item
        :to="{ name: 'd11-match', params: { id: d11MatchId } }"
      >
        <lazy-d11-match v-if="smAndUp" :d11MatchId="d11MatchId" />
      </list-container-item>
      <v-divider />
    </div>
  </list-container>
</template>

<script>
export default {
  name: "LazyD11MatchList",
  props: {
    date: String,
    d11MatchIds: Array
  },
  components: {
    ListContainer: () => import("@/components/ListContainer"),
    ListContainerItem: () => import("@/components/ListContainerItem"),
    LazyD11Match: () => import("@/views/d11_match/LazyD11Match")
  }
};
</script>
