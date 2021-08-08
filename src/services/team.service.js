import D11BootApi from "./d11BootApi";

const TeamService = {
  async getTeams() {
    try {
      const response = new D11BootApi.TeamApi().findAllTeams();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getTeamSeasonData(teamId, seasonId) {
    try {
      let teamPromise = new D11BootApi.TeamApi().findTeamById(teamId);
      let seasonPromise = new D11BootApi.SeasonApi().findSeasonById(seasonId);
      let teamSeasonStatPromise = new D11BootApi.TeamSeasonStatApi().findTeamSeasonStatByTeamIdAndSeasonId(
        teamId,
        seasonId
      );
      let matchPromise = new D11BootApi.MatchApi().findMatchByTeamIdAndSeasonId(
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
