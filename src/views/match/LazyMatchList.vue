<template>
  <list-container>
    <template v-slot:header>
      <div class="match-week-date list-container-header">
        <template v-if="date === 'Postponed'">
          {{ date }}
        </template>
        <template v-else>
          {{ date | moment("dddd, MMMM Do YYYY") }}
        </template>
      </div>
    </template>
    <div v-for="matchId in matchIds" :key="matchId">
      <list-container-item :to="{ name: 'match', params: { id: matchId } }">
        <lazy-match v-if="smAndUp" :matchId="matchId" />
      </list-container-item>
      <v-divider />
    </div>
  </list-container>
</template>

<script>
export default {
  name: "LazyMatchList",
  props: {
    date: String,
    matchIds: Array
  },
  components: {
    ListContainer: () => import("@/components/ListContainer"),
    ListContainerItem: () => import("@/components/ListContainerItem"),
    LazyMatch: () => import("@/views/match/LazyMatch")
  }
};
</script>
