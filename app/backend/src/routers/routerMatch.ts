import * as express from 'express';
import MatchController from '../controllers/controllerMatchs';

const matchRouter = express.Router();

matchRouter.get('/', MatchController.getAll);
matchRouter.post('/', MatchController.createMatch);
matchRouter.patch('/:id', MatchController.updateMatchGoals);
matchRouter.patch('/:id/finish', MatchController.updateProgressMatch);

export default matchRouter;
