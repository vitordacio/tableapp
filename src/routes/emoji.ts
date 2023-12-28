import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';

import { verifyParamEmojiId } from '../middlewares/verifyParamId';
import { createEmojiMiddleware } from '../middlewares/validators/Emoji/createEmoji';
import { createEmojiController } from '../main/Emoji/createEmoji';
import { deleteEmojiController } from '../main/Emoji/deleteEmoji';
import { findEmojiByIdController } from '../main/Emoji/findEmojiById';
import { updateEmojiController } from '../main/Emoji/updateEmoji';
import { updateEmojiMiddleware } from '../middlewares/validators/Emoji/updateEmoji';
import { fetchEmojiController } from '../main/Emoji/fetchEmoji';
import { verifyPageLimit } from '../middlewares/verifyPageLimit';
import { findEmojiController } from '../main/Emoji/findEmoji';
import { findEmojiAnimalController } from '../main/Emoji/findEmojiAnimal';
import { findEmojiBodyController } from '../main/Emoji/findEmojiBody';
import { findEmojiFaceController } from '../main/Emoji/findEmojiFace';
import { findEmojiPeopleController } from '../main/Emoji/findEmojiPeople';
import { findEmojiSymbolController } from '../main/Emoji/findEmojiSymbol';

const emojiRouter = Router();

emojiRouter.post(
  '/emoji',
  [verifyToken, createEmojiMiddleware],
  async (req: Request, res: Response) => {
    return createEmojiController.handle(req, res);
  },
);

emojiRouter.get(
  '/emoji',
  [verifyToken, verifyPageLimit],
  async (req: Request, res: Response) => {
    return findEmojiController.handle(req, res);
  },
);

emojiRouter.get(
  '/emoji/animal',
  [verifyToken, verifyPageLimit],
  async (req: Request, res: Response) => {
    return findEmojiAnimalController.handle(req, res);
  },
);

emojiRouter.get(
  '/emoji/body',
  [verifyToken, verifyPageLimit],
  async (req: Request, res: Response) => {
    return findEmojiBodyController.handle(req, res);
  },
);

emojiRouter.get(
  '/emoji/face',
  [verifyToken, verifyPageLimit],
  async (req: Request, res: Response) => {
    return findEmojiFaceController.handle(req, res);
  },
);

emojiRouter.get(
  '/emoji/people',
  [verifyToken, verifyPageLimit],
  async (req: Request, res: Response) => {
    return findEmojiPeopleController.handle(req, res);
  },
);

emojiRouter.get(
  '/emoji/symbol',
  [verifyToken, verifyPageLimit],
  async (req: Request, res: Response) => {
    return findEmojiSymbolController.handle(req, res);
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

emojiRouter.post(
  '/emoji/fetch',
  verifyToken,
  async (req: Request, res: Response) => {
    return fetchEmojiController.handle(req, res);
  },
);

export { emojiRouter };
