import { FindEmojiAnimalController } from '@controllers/Emoji/FindEmojiAnimalController';

function FindEmojiAnimalControllerFactory() {
  const findEmojiAnimalController = new FindEmojiAnimalController();

  return findEmojiAnimalController;
}

const findEmojiAnimalController = FindEmojiAnimalControllerFactory();

export { findEmojiAnimalController };
