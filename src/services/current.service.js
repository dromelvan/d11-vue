import D11BootApi from "./d11BootApi";

const CurrentService = {
  async currentSeason() {
    try {
      const response = new D11BootApi.SeasonApi().findCurrentSeason();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async currentTransferWindow() {
    try {
      const response = new D11BootApi.TransferWindowApi().findCurrentTransferWindow();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async currentTransferDay() {
    try {
      const response = new D11BootApi.TransferDayApi().findCurrentTransferDay();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default CurrentService;
