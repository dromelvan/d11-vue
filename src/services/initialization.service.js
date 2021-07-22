import store from "../store/index";
import CurrentService from "./current.service";

const InitializationService = {
  async initialize() {
    if (!store.getters.initialized) {
      let seasonPromise = await CurrentService.currentSeason();
      let transferWindowPromise = await CurrentService.currentTransferWindow();

      let combinedPromise = await Promise.allSettled([
        seasonPromise,
        transferWindowPromise
      ]);
      store.dispatch("initialize", {
        season: combinedPromise[0].value,
        transferWindow: combinedPromise[1].value
      });
    }
  }
};

export default InitializationService;
