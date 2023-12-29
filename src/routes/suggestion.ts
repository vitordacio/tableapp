import { Request, Response, Router } from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { verifyParamSuggestionId } from '../middlewares/verifyParamId';
import { createSuggestionMiddleware } from '../middlewares/validators/Suggestion/createSuggestion';
import { deleteSuggestionController } from '../main/Suggestion/deleteSuggestion';
import { findSuggestionController } from '../main/Suggestion/findSuggestion';
import { createSuggestionController } from '../main/Suggestion/createSuggestion';

const suggestionRouter = Router();

suggestionRouter.get(
  '/suggestion/:suggestion_id',
  [verifyToken, verifyParamSuggestionId],
  async (req: Request, res: Response) => {
    return findSuggestionController.handle(req, res);
  },
);

suggestionRouter.post(
  '/suggestion',
  [verifyToken, createSuggestionMiddleware],
  async (req: Request, res: Response) => {
    return createSuggestionController.handle(req, res);
  },
);

suggestionRouter.delete(
  '/suggestion/:suggestion_id',
  [verifyToken, verifyParamSuggestionId],
  async (req: Request, res: Response) => {
    return deleteSuggestionController.handle(req, res);
  },
);

export { suggestionRouter };
