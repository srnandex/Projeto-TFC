import { Request, Response, NextFunction} from 'express';
import CustomError from '../helpers/customError';

class ErrorHandler {
  internalError: number;

  constructor(internalError = 500) {
    this.internalError = internalError;
  }

  errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
      res.status(err.status).json({ message: err.message });

      return next();
    }
    res.status(this.internalError).json({ message: err.message });

    return next();
  };
}

const errorMiddleware = new ErrorHandler();

export default errorMiddleware;
