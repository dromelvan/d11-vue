import D11BootApi from "./d11BootApi";

const D11TeamService = {
  async getD11Teams() {
    try {
      let d11TeamApi = new D11BootApi.D11TeamApi();
      D11BootApi.setApiBasePath();
      const response = d11TeamApi.findAllD11Teams();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getD11TeamSeasonData(d11TeamId, seasonId) {
    try {
      let d11TeamApi = new D11BootApi.D11TeamApi();
      let seasonApi = new D11BootApi.SeasonApi();
      let d11TeamSeasonStatApi = new D11BootApi.D11TeamSeasonStatApi();
      let d11MatchApi = new D11BootApi.D11MatchApi();

      D11BootApi.setApiBasePath();

      let d11TeamPromise = d11TeamApi.findD11TeamById(d11TeamId);
      let seasonPromise = seasonApi.findSeasonById(seasonId);
      let d11TeamSeasonStatPromise = d11TeamSeasonStatApi.findD11TeamSeasonStatByD11TeamIdAndSeasonId(
        d11TeamId,
        seasonId
      );
      let d11MatchPromise = d11MatchApi.findD11MatchByD11TeamIdAndSeasonId(
        d11TeamId,
        seasonId
      );
      D11BootApi.setBearerToken();
      let d11TeamTransferStatusPromise = d11TeamApi.findD11TeamTransferStatusById(
        d11TeamId
      );

      let combinedPromise = await Promise.allSettled([
        d11TeamPromise,
        seasonPromise,
        d11TeamSeasonStatPromise,
        d11MatchPromise,
        d11TeamTransferStatusPromise
      ]);
      return Promise.resolve({
        d11Team: combinedPromise[0].value || null,
        season: combinedPromise[1].value || null,
        d11TeamSeasonStat: combinedPromise[2].value || null,
        d11MatchIds: combinedPromise[3].value || null,
        remainingTransfers: combinedPromise[4].value.remainingTransfers,
        transferListedPlayerIds:
          combinedPromise[4].value.pendingTransferListings.map(
            transferListing => transferListing.player.id
          ) || null
      }).finally(D11BootApi.clearBearerToken());
    } catch (error) {
      D11BootApi.clearBearerToken();
      return Promise.reject(error);
    }
  },
  async getD11TeamsByCurrentSeason() {
    try {
      let d11TeamApi = new D11BootApi.D11TeamApi();
      D11BootApi.setApiBasePath();
      const response = d11TeamApi.findD11TeamsByCurrentSeason();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getD11TeamsBySeason(seasonId) {
    try {
      let d11TeamApi = new D11BootApi.D11TeamApi();
      D11BootApi.setApiBasePath();
      const response = d11TeamApi.findD11TeamBySeasonId(seasonId);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default D11TeamService;
