import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import ILogin from '../interfaces/ILogin.interfaces';

dotenv.config();
const SECRET = process.env.JWT_SECRET as string;

export default class Jwt {
  static createToken(payload: ILogin) {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '3d',
      algorithm: 'HS256',
    };

    const token = jwt.sign(payload, SECRET, jwtConfig);
    return token;
  }
}
