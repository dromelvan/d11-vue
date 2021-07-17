import D11BootApi from "./d11BootApi";

const transferApi = new D11BootApi.TransferApi();

const TransferService = {
  async findTransfersByTransferDayId(transferDayId) {
    try {
      const response = transferApi.findTransferByTransferDayId(transferDayId);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default TransferService;
