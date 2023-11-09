import D11BootApi from "./d11BootApi";

const TransferBidService = {
  async findTransferBidsByTransferDayId(transferDayId) {
    try {
      let transferBidApi = new D11BootApi.TransferBidApi();
      D11BootApi.setApiBasePath();
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
      let transferBidApi = new D11BootApi.TransferBidApi();
      D11BootApi.setApiBasePath();
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
  },
  async deleteTransferBid(transferBidId) {
    try {
      let transferBidApi = new D11BootApi.TransferBidApi();
      D11BootApi.setApiBasePath();
      D11BootApi.setBearerToken();
      const response = transferBidApi.deleteTransferBid({
        transferBidId: transferBidId
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
