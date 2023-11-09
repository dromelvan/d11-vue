import D11BootApi from "./d11BootApi";

const PositionService = {
  async getPositions() {
    try {
      let positionApi = new D11BootApi.PositionApi();
      D11BootApi.setApiBasePath();
      const response = positionApi.findAllPositions();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default PositionService;
