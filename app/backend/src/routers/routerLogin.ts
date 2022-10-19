import * as express from 'express';
import LoginController from '../controllers/controllerLogin';

const loginRouter = express.Router();

loginRouter.post('/login', LoginController.login);

export default loginRouter;
