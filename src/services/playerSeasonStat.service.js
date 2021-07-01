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
  async getPlayerSeasonStatByD11TeamIdAndSeasonId(d11TeamId, seasonId) {
    try {
      let response = new D11BootApi.PlayerSeasonStatApi().findPlayerSeasonStatByD11TeamIdAndSeasonId(
        d11TeamId,
        seasonId
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
