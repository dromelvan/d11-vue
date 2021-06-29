import D11BootApi from "./d11BootApi";

const PlayerSeasonStatService = {
  async getPlayerSeasonStatsByPlayerId(playerId) {
    try {
      let response = new D11BootApi.PlayerSeasonStatApi().findPlayerSeasonStatByPlayerId(
        playerId
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getPlayerSeasonStatsBySeasonIdAndPage(seasonId, page) {
    try {
      let response = new D11BootApi.PlayerSeasonStatApi().findPlayerSeasonStatBySeasonId(
        seasonId,
        page
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default PlayerSeasonStatService;
