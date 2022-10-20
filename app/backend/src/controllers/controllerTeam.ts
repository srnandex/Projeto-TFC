import { Request, Response } from 'express';
import serviceTeam from '../services/serviceTeams';

export default class TeamsController {
  static async getAll(req: Request, res: Response) {
    const data = await serviceTeam.getAll();
    return res.status(200).json(data);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const data = await serviceTeam.findByid(id);
    return res.status(200).json(data);
  }
}
