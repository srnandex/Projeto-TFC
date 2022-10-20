import { IFinalLeaderBoard, IMatchesLeaderboard } from '../interfaces/ILeaderboard.interface';
import UAway from './UAway';
import UHome from './UHome';

export default class FormatLeaderboard {
  static goalsMatchsEffi = (hM: IMatchesLeaderboard[], aM: IMatchesLeaderboard[]) => {
    const sumPoints = UHome.getPoints(hM)
      + UAway.getPoints(aM);
    const sumGames = hM.length + aM.length;

    const result = (sumPoints / (sumGames * 3)) * 100;
    return Number(result.toFixed(2));
  };

  static leaderboard = (teamName: string, hM: IMatchesLeaderboard[], aM: IMatchesLeaderboard[]) => {
    const result = {
      name: teamName,
      totalPoints: UHome.getPoints(hM) + UAway.getPoints(aM),
      totalGames: hM.length + aM.length,
      totalVictories: UHome.getVictories(hM)
      + UAway.getVictories(aM),
      totalDraws: UHome.getDraws(hM) + UAway.getDraws(aM),
      totalLosses: UHome.getLosses(hM) + UAway.getLosses(aM),
      goalsFavor: UHome.getGoalsInFavor(hM)
      + UAway.getGoalsInFavor(aM),
      goalsOwn: UHome.getGoalsOwn(hM) + UAway.getGoalsOwn(aM),
      goalsBalance: UHome.getGoalsBalance(hM)
      + UAway.getGoalsBalance(aM),
      efficiency: this.goalsMatchsEffi(hM, aM),
    };
    return result;
  };

  static orgLeaderboard = (leaderboard: IFinalLeaderBoard[]) => {
    const leaderboardSorted = leaderboard.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));
    return leaderboardSorted;
  };
}
