import D11BootApi from "./d11BootApi";

const transferListingApi = new D11BootApi.TransferListingApi();

const TransferListingService = {
  async findTransferListingsByTransferDayId(transferDayId, page) {
    try {
      const response = transferListingApi.findTransferListingByTransferDayId(
        transferDayId,
        page
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async insertTransferListing(playerId) {
    try {
      D11BootApi.setBearerToken();
      const response = transferListingApi.insertTransferListing({
        playerId: playerId
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      D11BootApi.clearBearerToken();
    }
  },
  async deleteTransferListing(playerId) {
    try {
      D11BootApi.setBearerToken();
      const response = transferListingApi.deleteTransferListing({
        playerId: playerId
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      D11BootApi.clearBearerToken();
    }
  }
};

export default TransferListingService;
