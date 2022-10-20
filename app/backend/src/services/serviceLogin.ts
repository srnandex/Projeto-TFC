import UserModel from '../database/models/User';
import Jwt from '../helpers/jwt';
import ILogin from '../interfaces/ILogin.interfaces';
import Bcrypt from '../helpers/bcrypt';
import CustomError from '../helpers/customError';

export default class LoginService {
  static async Login(login: ILogin) {
    if (!login.email || !login.password) {
      throw new CustomError(400, 'All fields must be filled');
    }

    const userRegis = await UserModel.findOne({ where: { email: login.email } }) as UserModel;

    if (!userRegis) {
      throw new CustomError(401, 'Incorrect email or password');
    }

    Bcrypt.checkPassword(login.password, userRegis.password);
    const token = Jwt.createToken(login);
    return token;
  }

  static async Validation(token: string | undefined) {
    if (!token) throw new CustomError(400, 'Token não existe');
    const user = Jwt.veriToken(token) as ILogin;
    const findUser = await UserModel.findOne({ where: { email: user.email } }) as UserModel;
    return findUser.role;
  }
}
