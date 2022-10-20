import { Request, Response } from 'express';
import LeaderboardService from '../services/serviceLeaderboard';

export default class LeaderboardController {
  static async getHomeLeaderboard(req: Request, res: Response) {
    const data = await LeaderboardService.getHome();
    return res.status(200).json(data);
  }

  static async getAwayLeaderboard(req: Request, res: Response) {
    const data = await LeaderboardService.getAway();
    return res.status(200).json(data);
  }

  static async getLeaderboard(req: Request, res: Response) {
    const data = await LeaderboardService.getLeaderboard();
    return res.status(200).json(data);
  }
}
