import * as express from 'express';
import MatchController from '../controllers/controllerMatchs';

const matchRouter = express.Router();

matchRouter.get('/matches', MatchController.getAll);
matchRouter.post('/matches', MatchController.createMatch);
matchRouter.patch('/matches/:id', MatchController.updateMatchGoals);
matchRouter.patch('/matches/:id/finish', MatchController.updateProgressMatch);

export default matchRouter;
