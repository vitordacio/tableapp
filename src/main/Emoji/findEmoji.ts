import { FindEmojiController } from '@controllers/Emoji/FindEmojiController';

function FindEmojiControllerFactory() {
  const findEmojiController = new FindEmojiController();

  return findEmojiController;
}

const findEmojiController = FindEmojiControllerFactory();

export { findEmojiController };
