import { FindEmojiSymbolController } from '@controllers/Emoji/FindEmojiSymbolController';

function FindEmojiSymbolControllerFactory() {
  const findEmojiSymbolController = new FindEmojiSymbolController();

  return findEmojiSymbolController;
}

const findEmojiSymbolController = FindEmojiSymbolControllerFactory();

export { findEmojiSymbolController };
