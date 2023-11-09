import D11BootApi from "./d11BootApi";

const D11MatchService = {
  async findCurrentD11Matches() {
    try {
      let d11MatchApi = new D11BootApi.D11MatchApi();
      D11BootApi.setApiBasePath();
      const response = d11MatchApi.findCurrentD11Matches();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default D11MatchService;
