import D11BootApi from "./d11BootApi";

const SeasonService = {
  async getSeason(seasonId) {
    try {
      const response = new D11BootApi.SeasonApi().findSeasonById(seasonId);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getSeasonSummaryByIdd(seasonId) {
    try {
      const response = new D11BootApi.SeasonApi().findSeasonSummaryById(
        seasonId
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getSeasonData(seasonId) {
    try {
      let seasonPromise = new D11BootApi.SeasonApi().findSeasonById(seasonId);
      let seasonSummaryPromise = new D11BootApi.SeasonApi().findSeasonSummaryById(
        seasonId
      );

      let combinedPromise = await Promise.allSettled([
        seasonPromise,
        seasonSummaryPromise
      ]);
      return Promise.resolve({
        season: combinedPromise[0].value || null,
        seasonSummary: combinedPromise[1].value || null
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default SeasonService;
