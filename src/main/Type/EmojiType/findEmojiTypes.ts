import { FindEmojiTypesController } from '@controllers/Types/EmojiType/FindEmojiTypesController';

function FindEmojiTypesControllerFactory() {
  const findEmojiTypesController = new FindEmojiTypesController();

  return findEmojiTypesController;
}

const findEmojiTypesController = FindEmojiTypesControllerFactory();

export { findEmojiTypesController };
