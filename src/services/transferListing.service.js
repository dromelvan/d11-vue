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
  }
};

export default TransferListingService;
