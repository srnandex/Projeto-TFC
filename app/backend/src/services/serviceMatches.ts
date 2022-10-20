import TeamModel from '../database/models/Teams';
import MatchesModel from '../database/models/Matches';
import Match from '../interfaces/IMatches.interface';
import MatchGoals from '../interfaces/IMatchGoals.interface';
import CustomError from '../helpers/customError';

export default class MatchesService {
  static async getAll() {
    const matches = await MatchesModel.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  static async createMatch(teamsMach: Match) {
    const { homeTeam, awayTeam } = teamsMach;

    if (homeTeam === awayTeam) {
      throw new CustomError(
        401,
        'It is not possible to create a match with two equal teams',
      );
    }

    const teamHo = await TeamModel.findOne({ where: { id: homeTeam } });
    const teamAw = await TeamModel.findOne({ where: { id: awayTeam } });

    if (!teamHo || !teamAw) {
      throw new CustomError(404, 'There is no team with such id!');
    }

    const newMatch = await MatchesModel.create({ ...teamsMach, inProgress: true });
    return newMatch;
  }

  static async updateProgressMatch(id: number) {
    await MatchesModel.update({ inProgress: false }, { where: { id } });
  }

  static async updateMatchGoals(id: number, upMatchGoals: MatchGoals) {
    await MatchesModel.update({ ...upMatchGoals }, { where: { id } });
  }
}
