const navigationGroups = {
  home: {
    header: "Home",
    links: [
      { text: "Home", icon: "mdi-home", route: "home" },
      { text: "Rules", icon: "mdi-book", route: "placeholder" },
      { text: "About Drömelvan", icon: "mdi-information", route: "about" }
    ]
  },
  d11: {
    header: "D11",
    links: [{ text: "Season History", icon: "mdi-table", route: "seasons" }]
  },
  premierLeague: {
    header: "Premier League",
    links: [
      {
        text: "PL Link 1",
        icon: "mdi-order-numeric-descending",
        route: "placeholder"
      }
    ]
  }
};

export default navigationGroups;
