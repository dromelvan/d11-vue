import D11BootApi from "./d11BootApi";

const PlayerSeasonStatService = {
  async getPlayerSeasonStatsByPlayerId(playerId) {
    try {
      let playerSeasonStatApi = new D11BootApi.PlayerSeasonStatApi();
      D11BootApi.setApiBasePath();
      let response = playerSeasonStatApi.findPlayerSeasonStatByPlayerId(
        playerId
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getPlayerSeasonStatsByTeamIdAndSeasonId(teamId, seasonId) {
    try {
      let playerSeasonStatApi = new D11BootApi.PlayerSeasonStatApi();
      D11BootApi.setApiBasePath();
      let response = playerSeasonStatApi.findPlayerSeasonStatByTeamIdAndSeasonId(
        teamId,
        seasonId
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getPlayerSeasonStatByD11TeamIdAndSeasonId(d11TeamId, seasonId) {
    try {
      let playerSeasonStatApi = new D11BootApi.PlayerSeasonStatApi();
      D11BootApi.setApiBasePath();
      let response = playerSeasonStatApi.findPlayerSeasonStatByD11TeamIdAndSeasonId(
        d11TeamId,
        seasonId
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getPlayerSeasonStatsBySeasonIdAndPage(seasonId, page, opts) {
    try {
      let playerSeasonStatApi = new D11BootApi.PlayerSeasonStatApi();
      D11BootApi.setApiBasePath();
      let response = playerSeasonStatApi.findPlayerSeasonStatBySeasonId(
        seasonId,
        page,
        opts
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getAvailablePlayerSeasonStatBySeasonId(seasonId) {
    try {
      let playerSeasonStatApi = new D11BootApi.PlayerSeasonStatApi();
      D11BootApi.setApiBasePath();
      let response = playerSeasonStatApi.findAvailablePlayerSeasonStatBySeasonId(
        seasonId
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default PlayerSeasonStatService;
