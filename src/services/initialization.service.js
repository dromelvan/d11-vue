import store from "../store/index";
import CurrentService from "./current.service";
import TeamService from "./team.service";
import D11TeamService from "./d11Team.service";
import PositionService from "./position.service";
import CountryService from "./country.service";

const InitializationService = {
  async initialize() {
    if (!store.getters.initialized) {
      let seasonPromise = await CurrentService.currentSeason();
      let transferWindowPromise = await CurrentService.currentTransferWindow();
      let transferDayPromise = await CurrentService.currentTransferDay();
      let teamPromise = await TeamService.getTeams();
      let d11TeamPromise = await D11TeamService.getD11Teams();
      let positionPromise = await PositionService.getPositions();
      let countryPromise = await CountryService.getCountries();
      let currentD11TeamPromise = await D11TeamService.getD11TeamsBySeason(18);

      let combinedPromise = await Promise.allSettled([
        seasonPromise,
        transferWindowPromise,
        transferDayPromise,
        teamPromise,
        d11TeamPromise,
        positionPromise,
        countryPromise,
        currentD11TeamPromise
      ]);
      store.dispatch("initialize", {
        season: combinedPromise[0].value,
        transferWindow: combinedPromise[1].value,
        transferDay: combinedPromise[2].value,
        teams: combinedPromise[3].value,
        d11Teams: combinedPromise[4].value,
        positions: combinedPromise[5].value,
        countries: combinedPromise[6].value,
        currentD11Teams: combinedPromise[7].value
      });
    }
  }
};

export default InitializationService;
