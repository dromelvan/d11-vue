import D11BootApi from "./d11BootApi";

const TeamService = {
  async getTeams() {
    try {
      let teamApi = new D11BootApi.TeamApi();
      D11BootApi.setApiBasePath();
      const response = teamApi.findAllTeams();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getTeamSeasonData(teamId, seasonId) {
    try {
      let teamApi = new D11BootApi.TeamApi();
      let seasonApi = new D11BootApi.SeasonApi();
      let teamSeasonStatApi = new D11BootApi.TeamSeasonStatApi();
      let matchApi = new D11BootApi.MatchApi();
      D11BootApi.setApiBasePath();

      let teamPromise = teamApi.findTeamById(teamId);
      let seasonPromise = seasonApi.findSeasonById(seasonId);
      let teamSeasonStatPromise = teamSeasonStatApi.findTeamSeasonStatByTeamIdAndSeasonId(
        teamId,
        seasonId
      );
      let matchPromise = matchApi.findMatchByTeamIdAndSeasonId(
        teamId,
        seasonId
      );

      let combinedPromise = await Promise.allSettled([
        teamPromise,
        seasonPromise,
        teamSeasonStatPromise,
        matchPromise
      ]);
      return Promise.resolve({
        team: combinedPromise[0].value || null,
        season: combinedPromise[1].value || null,
        teamSeasonStat: combinedPromise[2].value || null,
        matchIds: combinedPromise[3].value || null
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default TeamService;
