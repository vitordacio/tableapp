import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';

import { verifyParamEmojiId } from '../middlewares/verifyParamId';
import { createEmojiMiddleware } from '../middlewares/validators/Emoji/createEmoji';
import { createEmojiController } from '../main/Emoji/createEmoji';
import { deleteEmojiController } from '../main/Emoji/deleteEmoji';
import { findEmojiByIdController } from '../main/Emoji/findEmojiById';
import { updateEmojiController } from '../main/Emoji/updateEmoji';
import { updateEmojiMiddleware } from '../middlewares/validators/Emoji/updateEmoji';

const emojiRouter = Router();

emojiRouter.post(
  '/emoji',
  [verifyToken, createEmojiMiddleware],
  async (req: Request, res: Response) => {
    return createEmojiController.handle(req, res);
  },
);

emojiRouter.post(
  '/emoji/fetch/face',
  verifyToken,
  async (req: Request, res: Response) => {
    return createEmojiController.handle(req, res);
  },
);

emojiRouter.get(
  '/emoji/:emoji_id',
  [verifyToken, verifyParamEmojiId],
  async (req: Request, res: Response) => {
    return findEmojiByIdController.handle(req, res);
  },
);

emojiRouter.put(
  '/emoji',
  [verifyToken, updateEmojiMiddleware],
  async (req: Request, res: Response) => {
    return updateEmojiController.handle(req, res);
  },
);

emojiRouter.delete(
  '/emoji/:id',
  [verifyToken, verifyParamEmojiId],
  async (req: Request, res: Response) => {
    return deleteEmojiController.handle(req, res);
  },
);

export { emojiRouter };
