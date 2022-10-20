import * as express from 'express';
import teamController from '../controllers/controllerTeam';

const teamRouter = express.Router();

teamRouter.get('/teams', teamController.getAll);
teamRouter.get('/teams/:id', teamController.findById);

export default teamRouter;
