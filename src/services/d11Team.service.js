import D11BootApi from "./d11BootApi";

const D11TeamService = {
  async getD11Teams() {
    try {
      const response = new D11BootApi.D11TeamApi().findAllD11Teams();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getD11TeamSeasonData(d11TeamId, seasonId) {
    try {
      let d11TeamPromise = new D11BootApi.D11TeamApi().findD11TeamById(
        d11TeamId
      );
      let seasonPromise = new D11BootApi.SeasonApi().findSeasonById(seasonId);
      let d11TeamSeasonStatPromise = new D11BootApi.D11TeamSeasonStatApi().findD11TeamSeasonStatByD11TeamIdAndSeasonId(
        d11TeamId,
        seasonId
      );
      let d11MatchPromise = new D11BootApi.D11MatchApi().findD11MatchByD11TeamIdAndSeasonId(
        d11TeamId,
        seasonId
      );
      D11BootApi.setBearerToken();
      let transferListingsPromise = new D11BootApi.TransferListingApi().findPendingTransferListingByD11TeamId(
        d11TeamId
      );

      let combinedPromise = await Promise.allSettled([
        d11TeamPromise,
        seasonPromise,
        d11TeamSeasonStatPromise,
        d11MatchPromise,
        transferListingsPromise
      ]);
      return Promise.resolve({
        d11Team: combinedPromise[0].value || null,
        season: combinedPromise[1].value || null,
        d11TeamSeasonStat: combinedPromise[2].value || null,
        d11MatchIds: combinedPromise[3].value || null,
        transferListedPlayerIds:
          combinedPromise[4].value.map(
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
      const response = new D11BootApi.D11TeamApi().findD11TeamsByCurrentSeason();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getD11TeamsBySeason(seasonId) {
    try {
      const response = new D11BootApi.D11TeamApi().findD11TeamBySeasonId(
        seasonId
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default D11TeamService;
