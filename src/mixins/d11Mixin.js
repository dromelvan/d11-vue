import store from "@/store/index";

const d11Mixin = {
  methods: {
    isView: function(views) {
      return views.includes(this.view);
    },
    loggedIn: function() {
      return store.state.status.loggedIn;
    },
    currentSeason: function() {
      return JSON.parse(localStorage.getItem("currentSeason")) || { id: 1 };
    },
    currentTransferWindow: function() {
      return (
        JSON.parse(localStorage.getItem("currentTransferWindow")) || { id: 1 }
      );
    },
    activeD11Team: function() {
      return JSON.parse(localStorage.getItem("d11-team"));
    },
    maxSeasonId: function() {
      return this.currentSeason().id;
    },
    minSeasonId: function() {
      return 2;
    },
    playerValue(value) {
      return (value / 10).toFixed(1);
    },
    playerName(player, maxLength) {
      if (player.shortName.length > maxLength) {
        return player.lastName;
      } else if (player.name.length > maxLength) {
        return player.shortName;
      } else {
        return player.name;
      }
    },
    playerAge(dateOfBirth) {
      return this.$moment().from(dateOfBirth, true);
    },
    playerRating(rating) {
      return (rating / 100).toFixed(2);
    },
    teamName(team, maxLength) {
      if (team.name.length < maxLength) {
        return team.name;
      } else {
        return team.shortName;
      }
    },
    elapsed: function(input) {
      var elapsed = input;
      if (elapsed === "HT") {
        elapsed = 45;
      } else if (isNaN(input)) {
        elapsed = input;
      }
      return (elapsed / 90) * 100;
    },
    elapsedText: function(input) {
      var elapsed = input;
      if (elapsed === "HT") {
        elapsed = "Half Time";
      } else if (elapsed === "FT") {
        elapsed = "Full Time";
      } else if (!isNaN(input)) {
        elapsed = input + " mins";
      } else if (isNaN(input)) {
        elapsed = input;
      }
      return elapsed;
    },
    pending: function(status) {
      return status.toUpperCase() === "PENDING";
    },
    active: function(status) {
      return status.toUpperCase() === "ACTIVE";
    },
    fullTime: function(status) {
      return status.toUpperCase().replace(" ", "_") === "FULL_TIME";
    },
    finished: function(status) {
      return status.toUpperCase() === "FINISHED";
    },
    postponed: function(status) {
      return status.toUpperCase() === "POSTPONED";
    },
    winner: function(match, teamId) {
      if (this.fullTime(match.status) || this.finished(match.status)) {
        if (match.homeTeamGoals > match.awayTeamGoals) {
          return match.homeTeam.id === teamId;
        }
        if (match.awayTeamGoals > match.homeTeamGoals) {
          return match.awayTeam.id === teamId;
        }
      }
      return false;
    },
    d11Winner: function(d11Match, d11TeamId) {
      if (this.fullTime(d11Match.status) || this.finished(d11Match.status)) {
        if (d11Match.homeTeamGoals > d11Match.awayTeamGoals) {
          return d11Match.homeD11Team.id === d11TeamId;
        }
        if (d11Match.awayTeamGoals > d11Match.homeTeamGoals) {
          return d11Match.awayD11Team.id === d11TeamId;
        }
      }
      return false;
    }
  },
  computed: {
    xs: function() {
      return this.$vuetify.breakpoint.xs;
    },
    smAndDown: function() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    smAndUp: function() {
      return this.$vuetify.breakpoint.smAndUp;
    },
    mdAndDown: function() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
    mdAndUp: function() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
    lgAndDown: function() {
      return this.$vuetify.breakpoint.lgAndDown;
    },
    lgAndUp: function() {
      return this.$vuetify.breakpoint.lgAndUp;
    },
    tab: {
      set(tab) {
        this.$router.replace({ params: { ...this.$route.params.tab, tab } });
      },
      get() {
        return this.$route.params.tab;
      }
    }
  }
};

export default d11Mixin;
