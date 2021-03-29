export default {
  install(Vue) {
    var d11Mapper = {
      playerStatsByPosition: function(playerStats) {
        var playerStatsByPosition = {
          positions: {},
          totalPoints: 0
        };
        playerStats.forEach(playerStat => {
          var position = playerStat.position.name;
          if (!(position in playerStatsByPosition.positions)) {
            playerStatsByPosition.positions[position] = [];
          }
          playerStatsByPosition.positions[position].push(playerStat);
          playerStatsByPosition.totalPoints += playerStat.points;
        });
        return playerStatsByPosition;
      }
    };
    Vue.prototype.$d11Mapper = d11Mapper;
  }
};
