import { Request, Response, NextFunction } from 'express';
import jwt from '../helpers/jwt';
import MatchesService from '../services/serviceMatches';

export default class MatchesController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await MatchesService.getAll();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async createMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      jwt.veriToken(authorization);
      const data = await MatchesService.createMatch(req.body);
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async updateProgressMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await MatchesService.updateProgressMatch(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  static async updateMatchGoals(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedMatch = req.body;
      await MatchesService.updateMatchGoals(Number(id), updatedMatch);
      return res.status(200).json(updatedMatch);
    } catch (error) {
      next(error);
    }
  }
}
