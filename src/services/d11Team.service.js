import D11BootApi from "./d11BootApi";

const D11TeamService = {
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
