import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import ILogin from '../interfaces/ILogin.interfaces';
import CustomError from './customError';

dotenv.config();
const SECRET = process.env.JWT_SECRET as string;

export default class Jwt {
  static createToken(payload: ILogin) {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '2d',
      algorithm: 'HS256',
    };

    const token = jwt.sign(payload, SECRET, jwtConfig);
    return token;
  }

  static veriToken(token: string | undefined) {
    try {
      if (!token) throw new CustomError(401, 'Token invalido');
      const check = jwt.verify(token, SECRET);
      return check;
    } catch (err) {
      throw new CustomError(401, 'Token invalido');
    }
  }
}
