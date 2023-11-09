import D11BootApi from "./d11BootApi";

const PlayerService = {
  async getPlayerSeasonData(playerId, seasonId) {
    try {
      let playerApi = new D11BootApi.PlayerApi();
      let seasonApi = new D11BootApi.SeasonApi();
      let playerSeasonStatApi = new D11BootApi.PlayerSeasonStatApi();
      D11BootApi.setApiBasePath();

      let playerPromise = playerApi.findPlayerById(playerId);
      let seasonPromise = seasonApi.findSeasonById(seasonId);
      let playerSeasonStatPromise = playerSeasonStatApi.findPlayerSeasonStatByPlayerIdAndSeasonId(
        playerId,
        seasonId
      );
      D11BootApi.setBearerToken();
      let playerTransferStatusPromise = playerApi.findPlayerTransferStatusById(
        playerId
      );
      let combinedPromise = await Promise.allSettled([
        playerPromise,
        seasonPromise,
        playerSeasonStatPromise,
        playerTransferStatusPromise
      ]);
      return Promise.resolve({
        player: combinedPromise[0].value || null,
        season: combinedPromise[1].value || null,
        playerSeasonStat: combinedPromise[2].value || null,
        playerTransferStatus: combinedPromise[3].value || null
      }).finally(D11BootApi.clearBearerToken());
    } catch (error) {
      D11BootApi.clearBearerToken();
      return Promise.reject(error);
    }
  },
  async getPlayerMatchStats(playerId, seasonId) {
    try {
      let playerMatchStatApi = new D11BootApi.PlayerMatchStatApi();
      D11BootApi.setApiBasePath();
      let response = playerMatchStatApi.findPlayerMatchStatByPlayerIdAndSeasonId(
        playerId,
        seasonId
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async insertPlayer(player) {
    try {
      let playerApi = new D11BootApi.PlayerApi();
      D11BootApi.setApiBasePath();
      D11BootApi.setBearerToken();
      let response = playerApi.insertPlayer(player);
      D11BootApi.clearBearerToken();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updatePlayer(player) {
    try {
      let playerApi = new D11BootApi.PlayerApi();
      D11BootApi.setApiBasePath();
      D11BootApi.setBearerToken();
      let response = playerApi.updatePlayer(player);
      D11BootApi.clearBearerToken();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default PlayerService;
