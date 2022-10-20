import ModelTeam from '../database/models/Teams';

export default class TeamsService {
  static async getAll() {
    const team = await ModelTeam.findAll();
    return team;
  }

  static async findByid(id: string) {
    const team = await ModelTeam.findByPk(id);
    return team;
  }
}
