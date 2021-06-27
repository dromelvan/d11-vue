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
      return store.getters.currentSeason;
    },
    playerValue(value) {
      return (value / 10).toFixed(1);
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
    }
  }
};

export default d11Mixin;
