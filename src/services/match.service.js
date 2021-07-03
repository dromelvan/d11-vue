import D11BootApi from "./d11BootApi";

const MatchService = {
  async findCurrentMatches() {
    try {
      const response = new D11BootApi.MatchApi().findCurrentMatches();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default MatchService;
