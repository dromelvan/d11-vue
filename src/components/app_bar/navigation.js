const navigationGroups = {
  home: {
    header: "Home",
    nudgeLeft: 35,
    links: [
      { text: "Home", icon: "mdi-home", route: { name: "home" } },
      { text: "Rules", icon: "mdi-book", route: { name: "rules" } },
      {
        text: "About Drömelvan",
        icon: "mdi-information",
        route: { name: "about" }
      }
    ]
  },
  d11: {
    header: "D11",
    nudgeLeft: 36,
    links: [
      {
        text: "League Table",
        icon: "mdi-table",
        route: {
          name: "season",
          params: { id: "current", tab: "d11-league-table" }
        }
      },
      {
        text: "D11 Teams",
        icon: "mdi-account-multiple",
        route: {
          name: "d11Teams",
          params: { seasonId: "current" }
        }
      },
      {
        text: "Current Match Week",
        icon: "mdi-calendar-month",
        route: {
          name: "matchWeek",
          params: { id: "current", tab: "d11-matches" }
        }
      },
      {
        text: "Current Transfer Window",
        icon: "mdi-transit-transfer",
        route: {
          name: "transferWindow",
          params: { id: "current", tab: "transfers" }
        }
      },
      {
        text: "Available Players",
        icon: "mdi-account-multiple",
        route: {
          name: "availablePlayers",
          params: { seasonId: "current" }
        }
      },
      {
        text: "Season History",
        icon: "mdi-format-list-bulleted-square",
        route: { name: "seasons" }
      }
    ]
  },
  premierLeague: {
    header: "Premier League",
    nudgeLeft: 0,
    links: [
      {
        text: "League Table",
        icon: "mdi-table",
        route: {
          name: "season",
          params: { id: "current", tab: "premier-league-table" }
        }
      },
      {
        text: "Current Match Week",
        icon: "mdi-calendar-month",
        route: {
          name: "matchWeek",
          params: { id: "current", tab: "matches" }
        }
      },
      {
        text: "Player Statistics",
        icon: "mdi-format-list-bulleted-square",
        route: {
          name: "playerSeasonStats",
          params: { seasonId: "current", tab: "stats" }
        }
      }
    ]
  }
};

export default navigationGroups;
