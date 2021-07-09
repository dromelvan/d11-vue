import D11BootApi from "./d11BootApi";

const D11TeamService = {
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

      let combinedPromise = await Promise.allSettled([
        d11TeamPromise,
        seasonPromise,
        d11TeamSeasonStatPromise,
        d11MatchPromise
      ]);
      return Promise.resolve({
        d11Team: combinedPromise[0].value || null,
        season: combinedPromise[1].value || null,
        d11TeamSeasonStat: combinedPromise[2].value || null,
        d11MatchIds: combinedPromise[3].value || null
      });
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
