import D11BootApi from "./d11BootApi";

const MatchWeekService = {
  async findMatchWeekById(matchWeekId) {
    try {
      const response = new D11BootApi.MatchWeekApi().findMatchWeekById(
        matchWeekId
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async findCurrentMatchWeek() {
    try {
      const response = new D11BootApi.MatchWeekApi().findCurrentMatchWeek();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default MatchWeekService;
