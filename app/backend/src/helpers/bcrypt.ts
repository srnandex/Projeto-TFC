import * as bcrypt from 'bcryptjs';
import CustomError from './customError';

export default class Bcrypt {
  static encryptPassword = (password: string) => {
    const salt = bcrypt.genSaltSync();
    const encryptedPassword = bcrypt.hashSync(password, salt);
    return encryptedPassword;
  };

  static checkPassword = (password: string, passwordDb: string) => {
    const checkPass = bcrypt.compareSync(password, passwordDb);
    if (!checkPass) {
      throw new CustomError(401, 'User does not exist or invalid password');
    }
  };
}
