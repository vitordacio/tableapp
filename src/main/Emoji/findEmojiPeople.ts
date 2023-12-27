import { FindEmojiPeopleController } from '@controllers/Emoji/FindEmojiPeopleController';

function FindEmojiPeopleControllerFactory() {
  const findEmojiPeopleController = new FindEmojiPeopleController();

  return findEmojiPeopleController;
}

const findEmojiPeopleController = FindEmojiPeopleControllerFactory();

export { findEmojiPeopleController };
