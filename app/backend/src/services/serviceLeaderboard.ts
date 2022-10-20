import MatchesModel from '../database/models/Matches';
import TeamModel from '../database/models/Teams';
import { LeaderAway, LeaderHome, LeaderboardMatches } from '../interfaces/ILeaderboard.interface';
import UtilHomeLeaderboard from './UHome';
import UtilAwayLeaderboard from './UAway';
import UtilLeaderboard from './ULeaderboard';

export default class LeaderboardService {
  static async getHome() {
    const teams = await TeamModel.findAll({
      include: [
        { model: MatchesModel, as: 'homeMatches', where: { inProgress: false } },
      ],
    }) as LeaderHome[];
    const randomTeamsMatches = teams.map(({ teamName, homeMatches }) => {
      const data = UtilHomeLeaderboard.homeLeaderboard(teamName, homeMatches);
      return data;
    });
    const organAZ = UtilHomeLeaderboard.orderLeaderboard(randomTeamsMatches);
    return organAZ;
  }

  static async getAway() {
    const teams = await TeamModel.findAll({
      include: [
        { model: MatchesModel, as: 'awayMatches', where: { inProgress: false } },
      ],
    }) as LeaderAway[];
    const randomTeamsMatches = teams.map(({ teamName, awayMatches }) => {
      const data = UtilAwayLeaderboard.awayLeaderboard(teamName, awayMatches);
      return data;
    });
    const organAZ = UtilHomeLeaderboard.orderLeaderboard(randomTeamsMatches);
    return organAZ;
  }

  static async getLeaderboard() {
    const teams = await TeamModel.findAll({
      include: [
        { model: MatchesModel, as: 'homeMatches', where: { inProgress: false } },
        { model: MatchesModel, as: 'awayMatches', where: { inProgress: false } },
      ],
    }) as LeaderboardMatches[];
    const randomTeamsMatches = teams.map(({ teamName, homeMatches, awayMatches }) => {
      const data = UtilLeaderboard.leaderboard(teamName, homeMatches, awayMatches);
      return data;
    });
    const organAZ = UtilLeaderboard.orderLeaderboard(randomTeamsMatches);
    return organAZ;
  }
}
