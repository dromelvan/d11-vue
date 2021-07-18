import D11BootApi from "./d11BootApi";

const transferBidApi = new D11BootApi.TransferBidApi();

const TransferBidService = {
  async findTransferBidsByTransferDayId(transferDayId) {
    try {
      const response = transferBidApi.findTransferBidByTransferDayId(
        transferDayId
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default TransferBidService;
