import { FindEmojiByIdController } from '@controllers/Emoji/FindEmojiByIdController';

function FindEmojiByIdControllerFactory() {
  const findEmojiByIdController = new FindEmojiByIdController();

  return findEmojiByIdController;
}

const findEmojiByIdController = FindEmojiByIdControllerFactory();

export { findEmojiByIdController };
