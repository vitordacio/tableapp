import { FindEmojiBodyController } from '@controllers/Emoji/FindEmojiBodyController';

function FindEmojiBodyControllerFactory() {
  const findEmojiBodyController = new FindEmojiBodyController();

  return findEmojiBodyController;
}

const findEmojiBodyController = FindEmojiBodyControllerFactory();

export { findEmojiBodyController };
