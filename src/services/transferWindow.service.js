import D11BootApi from "./d11BootApi";

const transferWindowApi = new D11BootApi.TransferWindowApi();
const transferDayApi = new D11BootApi.TransferDayApi();

const TransferWindowService = {
  async findTransferWindowsBySeasonId(seasonId) {
    try {
      const response = transferWindowApi.findTransferWindowBySeasonId(seasonId);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async findTransferWindowById(transferWindowId) {
    try {
      const response = transferWindowApi.findTransferWindowById(
        transferWindowId
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getTransferWindowData(transferWindowId) {
    try {
      let transferWindowPromise = transferWindowApi.findTransferWindowById(
        transferWindowId
      );
      let transferDaysPromise = transferDayApi.findTransferDayByTransferWindowId(
        transferWindowId
      );

      let combinedPromise = await Promise.allSettled([
        transferWindowPromise,
        transferDaysPromise
      ]);
      return Promise.resolve({
        transferWindow: combinedPromise[0].value || null,
        transferDays: combinedPromise[1].value || null
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default TransferWindowService;
