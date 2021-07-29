import store from "../store/index";
import CurrentService from "./current.service";

const InitializationService = {
  async initialize() {
    if (!store.getters.initialized) {
      let seasonPromise = await CurrentService.currentSeason();
      let transferWindowPromise = await CurrentService.currentTransferWindow();
      let transferDayPromise = await CurrentService.currentTransferDay();

      let combinedPromise = await Promise.allSettled([
        seasonPromise,
        transferWindowPromise,
        transferDayPromise
      ]);
      store.dispatch("initialize", {
        season: combinedPromise[0].value,
        transferWindow: combinedPromise[1].value,
        transferDay: combinedPromise[2].value
      });
    }
  }
};

export default InitializationService;
