import * as express from 'express';
import LoginController from '../controllers/controllerLogin';

const loginRouter = express.Router();

loginRouter.post('/login', LoginController.login);
loginRouter.get('/login/validate', LoginController.loginValidation);

export default loginRouter;
