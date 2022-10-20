import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/serviceLogin';

export default class LoginController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const login = req.body;
      const token = await LoginService.Login(login);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async loginValidation(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      const role = await LoginService.Validation(authorization);

      res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  }
}
