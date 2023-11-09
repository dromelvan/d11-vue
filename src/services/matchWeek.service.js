import D11BootApi from "./d11BootApi";

const MatchWeekService = {
  async findMatchWeekById(matchWeekId) {
    try {
      let matchWeekApi = new D11BootApi.MatchWeekApi();
      D11BootApi.setApiBasePath();
      const response = matchWeekApi.findMatchWeekById(matchWeekId);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async findCurrentMatchWeek() {
    try {
      let matchWeekApi = new D11BootApi.MatchWeekApi();
      D11BootApi.setApiBasePath();
      const response = matchWeekApi.findCurrentMatchWeek();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default MatchWeekService;
