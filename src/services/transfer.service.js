import D11BootApi from "./d11BootApi";

const TransferService = {
  async findTransfersByTransferDayId(transferDayId) {
    try {
      let transferApi = new D11BootApi.TransferApi();
      D11BootApi.setApiBasePath();
      const response = transferApi.findTransferByTransferDayId(transferDayId);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async insertTransfer(transfer) {
    try {
      let transferApi = new D11BootApi.TransferApi();
      D11BootApi.setApiBasePath();
      D11BootApi.setBearerToken();
      let response = transferApi.insertTransfer(transfer);
      D11BootApi.clearBearerToken();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default TransferService;
