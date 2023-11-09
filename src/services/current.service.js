import D11BootApi from "./d11BootApi";

const CurrentService = {
  async currentSeason() {
    try {
      let seasonApi = new D11BootApi.SeasonApi();
      D11BootApi.setApiBasePath();
      const response = seasonApi.findCurrentSeason();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async currentTransferWindow() {
    try {
      let transferWindowApi = new D11BootApi.TransferWindowApi();
      D11BootApi.setApiBasePath();
      const response = transferWindowApi.findCurrentTransferWindow();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async currentTransferDay() {
    try {
      let transferDayApi = new D11BootApi.TransferDayApi();
      D11BootApi.setApiBasePath();
      const response = transferDayApi.findCurrentTransferDay();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default CurrentService;
