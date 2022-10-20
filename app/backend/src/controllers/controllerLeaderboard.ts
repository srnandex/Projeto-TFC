import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/serviceLeaderboard';

export default class LeaderboardController {
  static async getHomeLeaderboard(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await LeaderboardService.getHome();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getAwayLeaderboard(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await LeaderboardService.getAway();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getLeaderboard(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await LeaderboardService.getLeaderboard();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
