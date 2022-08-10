import D11BootApi from "./d11BootApi";

const PlayerService = {
  async getPlayerSeasonData(playerId, seasonId) {
    try {
      let playerPromise = new D11BootApi.PlayerApi().findPlayerById(playerId);
      let seasonPromise = new D11BootApi.SeasonApi().findSeasonById(seasonId);
      let playerSeasonStatPromise = new D11BootApi.PlayerSeasonStatApi().findPlayerSeasonStatByPlayerIdAndSeasonId(
        playerId,
        seasonId
      );
      D11BootApi.setBearerToken();
      let playerTransferStatusPromise = new D11BootApi.PlayerApi().findPlayerTransferStatusById(
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
      let response = new D11BootApi.PlayerMatchStatApi().findPlayerMatchStatByPlayerIdAndSeasonId(
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
