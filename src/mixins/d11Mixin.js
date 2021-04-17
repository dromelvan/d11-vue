const d11Mixin = {
  methods: {
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
