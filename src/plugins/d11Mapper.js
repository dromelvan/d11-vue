export default {
  install(Vue) {
    var d11Mapper = {
      playerMatchStatsByPosition: function(playerMatchStats) {
        var playerMatchStatsByPosition = {
          positions: {},
          totalPoints: 0
        };
        playerMatchStats.forEach(playerMatchStat => {
          var position = playerMatchStat.position.name;
          if (!(position in playerMatchStatsByPosition.positions)) {
            playerMatchStatsByPosition.positions[position] = [];
          }
          playerMatchStatsByPosition.positions[position].push(playerMatchStat);
          playerMatchStatsByPosition.totalPoints += playerMatchStat.points;
        });
        return playerMatchStatsByPosition;
      }
    };
    Vue.prototype.$d11Mapper = d11Mapper;
  }
};
