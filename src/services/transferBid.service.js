import D11BootApi from "./d11BootApi";

const transferBidApi = new D11BootApi.TransferBidApi();

const TransferBidService = {
  async findTransferBidsByTransferDayId(transferDayId) {
    try {
      D11BootApi.setBearerToken();
      const response = transferBidApi.findTransferBidByTransferDayId(
        transferDayId
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      D11BootApi.clearBearerToken();
    }
  },
  async insertTransferBid(playerId, fee) {
    try {
      D11BootApi.setBearerToken();
      const response = transferBidApi.insertTransferBid({
        playerId: playerId,
        fee: fee
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      D11BootApi.clearBearerToken();
    }
  }
};

export default TransferBidService;
