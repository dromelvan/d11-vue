import store from "../store/index";
import CurrentService from "./current.service";

const InitializationService = {
  async initialize() {
    if (!store.getters.initialized) {
      const response = await CurrentService.currentSeason();
      store.dispatch("initialize", { season: response });
    }
  }
};

export default InitializationService;
