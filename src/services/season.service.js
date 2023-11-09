import D11BootApi from "./d11BootApi";

const SeasonService = {
  async getSeason(seasonId) {
    try {
      let seasonApi = new D11BootApi.SeasonApi();
      D11BootApi.setApiBasePath();
      const response = seasonApi.findSeasonById(seasonId);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getSeasonSummaryByIdd(seasonId) {
    try {
      let seasonApi = new D11BootApi.SeasonApi();
      D11BootApi.setApiBasePath();
      const response = seasonApi.findSeasonSummaryById(seasonId);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getSeasonData(seasonId) {
    try {
      let seasonApi = new D11BootApi.SeasonApi();
      D11BootApi.setApiBasePath();
      let seasonPromise = seasonApi.findSeasonById(seasonId);
      let seasonSummaryPromise = seasonApi.findSeasonSummaryById(seasonId);

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
