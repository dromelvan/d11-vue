import D11BootApi from "./d11BootApi";

const PositionService = {
  async getPositions() {
    try {
      const response = new D11BootApi.PositionApi().findAllPositions();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default PositionService;
