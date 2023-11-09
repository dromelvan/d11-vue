import D11BootApi from "./d11BootApi";

const TransferDayService = {
  async findTransferDaysByTransferWindowId(transferWindowId) {
    try {
      let transferDayApi = new D11BootApi.TransferDayApi();
      D11BootApi.setApiBasePath();
      const response = transferDayApi.findTransferDayByTransferWindowId(
        transferWindowId
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async findTransferDayById(transferDayId) {
    try {
      let transferDayApi = new D11BootApi.TransferDayApi();
      D11BootApi.setApiBasePath();
      const response = transferDayApi.findTransferDayById(transferDayId);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateTransferDay(transferDay) {
    try {
      let transferDayApi = new D11BootApi.TransferDayApi();
      D11BootApi.setApiBasePath();
      D11BootApi.setBearerToken();
      let response = transferDayApi.updateTransferDay(transferDay);
      D11BootApi.clearBearerToken();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default TransferDayService;
