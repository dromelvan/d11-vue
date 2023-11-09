import D11BootApi from "./d11BootApi";

const MatchService = {
  async findCurrentMatches() {
    try {
      let matchApi = new D11BootApi.MatchApi();
      D11BootApi.setApiBasePath();
      const response = matchApi.findCurrentMatches();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default MatchService;
