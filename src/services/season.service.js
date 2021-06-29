import D11BootApi from "./d11BootApi";

const SeasonService = {
  async getSeason(seasonId) {
    try {
      const response = new D11BootApi.SeasonApi().findSeasonById(seasonId);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default SeasonService;
