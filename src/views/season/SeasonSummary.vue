<template>
  <v-lazy
    v-model="visible"
    :options="{ threshold: 0.5 }"
    min-height="200"
    transition="fade-transition"
  >
    <div class="season" v-if="seasonSummary">
      <h2>{{ seasonSummary.name }}</h2>
      <v-row>
        <!-- D11 League winner ---------------------------->
        <v-col md="3" sm="6" cols="12" v-if="smAndUp">
          <router-link
            :to="{
              name: 'season',
              params: { id: seasonSummary.id, tab: 'd11-league-table' }
            }"
            class="v-card-link"
          >
            <v-card class="d11-champion" outlined>
              <v-card-title>
                <v-img
                  dark
                  max-height="64px"
                  src="@/assets/images/card-title-background.png"
                >
                  D11
                  {{ finished(seasonSummary.status) ? "Champion" : "Leader" }}
                </v-img>
              </v-card-title>
              <v-card-subtitle>
                {{ seasonSummary.top3D11TeamSeasonStats[0].d11Team.name }}
              </v-card-subtitle>
              <v-card-text>
                <d11-team-image
                  size="medium"
                  :id="seasonSummary.top3D11TeamSeasonStats[0].d11Team.id"
                />
              </v-card-text>
              <v-card-text>
                <span class="number">
                  {{ seasonSummary.top3D11TeamSeasonStats[0].points }}
                </span>
                points
                <span class="number">
                  {{ seasonSummary.top3D11TeamSeasonStats[0].goalsFor }}
                </span>
                goals
              </v-card-text>
              <v-card-text v-if="finished(seasonSummary.status)">
                <span class="number">
                  {{
                    seasonSummary.top3D11TeamSeasonStats[0].winCount
                      | ordinal({ includeNumber: true })
                  }}
                </span>
                D11 victory
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>

        <!-- Premier League winner ------------------------>
        <v-col md="3" sm="6" cols="12" v-if="smAndUp">
          <router-link
            :to="{
              name: 'season',
              params: { id: seasonSummary.id, tab: 'premier-league-table' }
            }"
            class="v-card-link"
          >
            <v-card class="premier-league-champions" outlined>
              <v-card-title>
                <v-img
                  dark
                  max-height="64px"
                  src="@/assets/images/card-title-background.png"
                >
                  Premier League
                  {{ finished(seasonSummary.status) ? "Champions" : "Leaders" }}
                </v-img>
              </v-card-title>
              <v-card-subtitle>
                {{ seasonSummary.top3TeamSeasonStats[0].team.name }}
              </v-card-subtitle>
              <v-card-text>
                <team-image
                  size="medium"
                  :id="seasonSummary.top3TeamSeasonStats[0].team.id"
                />
              </v-card-text>
              <v-card-text>
                <span class="number">
                  {{ seasonSummary.top3TeamSeasonStats[0].points }}
                </span>
                points
                <span class="number">
                  +{{ seasonSummary.top3TeamSeasonStats[0].goalDifference }}
                </span>
                goal difference
              </v-card-text>
              <v-card-text v-if="finished(seasonSummary.status)">
                <span class="number">
                  {{
                    seasonSummary.top3TeamSeasonStats[0].winCount
                      | ordinal({ includeNumber: true })
                  }}
                </span>
                league victory
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>

        <!-- Most valuable player ------------------------->
        <v-col md="3" sm="6" cols="12" v-if="smAndUp">
          <router-link
            :to="{
              name: 'playerSeasonStats',
              params: {
                seasonId: seasonSummary.id
              }
            }"
            class="v-card-link"
          >
            <v-card class="most-valuable-player" outlined>
              <v-card-title>
                <v-card-title>
                  <v-img
                    dark
                    max-height="64px"
                    src="@/assets/images/card-title-background.png"
                  >
                    Most Valuable Player
                  </v-img>
                </v-card-title>
              </v-card-title>
              <div v-if="seasonSummary.top3PlayerSeasonStats.length >= 3">
                <v-card-subtitle>
                  {{ seasonSummary.top3PlayerSeasonStats[0].player.name }}
                </v-card-subtitle>
                <v-card-text>
                  <player-image
                    size="medium"
                    :fileName="
                      seasonSummary.top3PlayerSeasonStats[0].player
                        .photoFileName
                    "
                  />
                </v-card-text>
                <v-card-text>
                  <span class="number">
                    {{ seasonSummary.top3PlayerSeasonStats[0].points }}
                  </span>
                  points
                  <span class="number">
                    {{ seasonSummary.top3PlayerSeasonStats[0].goals }}
                  </span>
                  goals
                </v-card-text>
                <v-card-text v-if="finished(seasonSummary.status)">
                  <span class="number">
                    {{
                      seasonSummary.top3PlayerSeasonStats[0].winCount
                        | ordinal({ includeNumber: true })
                    }}
                  </span>
                  most valuable player award
                </v-card-text>
                <v-card-text>
                  <team-image
                    size="tiny"
                    :id="seasonSummary.top3PlayerSeasonStats[0].team.id"
                  />
                  {{ seasonSummary.top3PlayerSeasonStats[0].team.name }}
                </v-card-text>
                <v-card-text>
                  <d11-team-image
                    size="tiny"
                    :id="seasonSummary.top3PlayerSeasonStats[0].d11Team.id"
                  />
                  {{ seasonSummary.top3PlayerSeasonStats[0].d11Team.name }}
                </v-card-text>
              </div>
            </v-card>
          </router-link>
        </v-col>

        <!-- Runners up ----------------------------------->
        <v-col md="3" sm="6" cols="12" v-if="smAndUp">
          <v-card class="runners-up" outlined>
            <v-card-title>
              <v-img
                dark
                max-height="64px"
                src="@/assets/images/card-title-background.png"
              >
                Runners up
              </v-img>
            </v-card-title>
            <v-card-subtitle>Premier League</v-card-subtitle>
            <v-card-text v-for="index in [1, 2]" :key="'tss.' + index">
              <team-image
                size="tiny"
                :id="seasonSummary.top3TeamSeasonStats[index].team.id"
              />
              {{ seasonSummary.top3TeamSeasonStats[index].team.name }}
              <span class="number">
                {{ seasonSummary.top3TeamSeasonStats[index].points }}
              </span>
              pts
            </v-card-text>
            <v-card-subtitle>D11 League</v-card-subtitle>
            <v-card-text v-for="index in [1, 2]" :key="'d11tss.' + index">
              <d11-team-image
                size="tiny"
                :id="seasonSummary.top3D11TeamSeasonStats[index].d11Team.id"
              />
              {{ seasonSummary.top3D11TeamSeasonStats[index].d11Team.name }}
              <span class="number">
                {{ seasonSummary.top3D11TeamSeasonStats[index].points }}
              </span>
              pts
            </v-card-text>
            <v-card-subtitle>Most valuable players</v-card-subtitle>
            <div v-if="seasonSummary.top3PlayerSeasonStats.length >= 3">
              <v-card-text v-for="index in [1, 2]" :key="'pss.' + index">
                <player-image
                  size="tiny"
                  :fileName="
                    seasonSummary.top3PlayerSeasonStats[index].player
                      .photoFileName
                  "
                />
                {{ seasonSummary.top3PlayerSeasonStats[index].player.name }}
                <span class="number">
                  {{ seasonSummary.top3PlayerSeasonStats[index].points }}
                </span>
                pts
              </v-card-text>
            </div>
          </v-card>
        </v-col>

        <!-- Winners and runners up ----------------------------------->
        <v-col md="3" sm="6" cols="12" v-if="xs">
          <v-card class="runners-up" outlined>
            <v-card-title>
              <v-img
                dark
                max-height="64px"
                src="@/assets/images/card-title-background.png"
              >
                {{ finished(seasonSummary.status) ? "Winners" : "Leaders" }} and
                runners up
              </v-img>
            </v-card-title>
            <v-card-subtitle>Premier League</v-card-subtitle>
            <v-card-text v-for="index in [0, 1, 2]" :key="'tss.' + index">
              <team-image
                size="tiny"
                :id="seasonSummary.top3TeamSeasonStats[index].team.id"
              />
              {{ seasonSummary.top3TeamSeasonStats[index].team.name }}
              <span class="number">
                {{ seasonSummary.top3TeamSeasonStats[index].points }}
              </span>
              pts
            </v-card-text>
            <v-card-subtitle>D11 League</v-card-subtitle>
            <v-card-text v-for="index in [0, 1, 2]" :key="'d11tss.' + index">
              <d11-team-image
                size="tiny"
                :id="seasonSummary.top3D11TeamSeasonStats[index].d11Team.id"
              />
              {{ seasonSummary.top3D11TeamSeasonStats[index].d11Team.name }}
              <span class="number">
                {{ seasonSummary.top3D11TeamSeasonStats[index].points }}
              </span>
              pts
            </v-card-text>
            <v-card-subtitle>Most valuable players</v-card-subtitle>
            <div v-if="seasonSummary.top3PlayerSeasonStats.length >= 3">
              <v-card-text v-for="index in [0, 1, 2]" :key="'pss.' + index">
                <team-image
                  size="tiny"
                  :id="seasonSummary.top3PlayerSeasonStats[index].team.id"
                />
                {{ seasonSummary.top3PlayerSeasonStats[index].player.name }}
                <span class="number">
                  {{ seasonSummary.top3PlayerSeasonStats[index].points }}
                </span>
                pts
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-lazy>
</template>

<script>
export default {
  name: "SeasonSummary",
  props: {
    seasonId: Number
  },
  data: () => ({
    seasonSummary: null,
    visible: false
  }),
  components: {
    TeamImage: () => import("@/components/image/TeamImage"),
    D11TeamImage: () => import("@/components/image/D11TeamImage"),
    PlayerImage: () => import("@/components/image/PlayerImage")
  },
  methods: {
    getSeason: function() {
      new this.$d11BootApi.SeasonApi()
        .findSeasonSummaryById(this.seasonId)
        .then(result => (this.seasonSummary = result));
    }
  },
  watch: {
    visible() {
      this.getSeason();
    }
  }
};
</script>

<style lang="scss" scoped>
h2 {
  padding-bottom: $d11-spacer;
}

.row {
  padding-bottom: $d11-spacer;
}

.v-card__title {
  background-color: var(--v-primary-base);
  color: white !important;
  display: block;
  letter-spacing: 0;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1em;

  padding: 0px;
  .v-image {
    padding: 16px;
  }
}

.v-card {
  min-height: 400px;

  .number {
    font-weight: 600;
  }
}

.v-card:not(.runners-up) {
  text-align: center;
  .v-card__subtitle {
    font-size: 1.2rem;
  }
}
</style>
