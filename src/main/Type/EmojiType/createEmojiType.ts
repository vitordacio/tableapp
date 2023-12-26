import { CreateEmojiTypeController } from '@controllers/Types/EmojiType/CreateEmojiTypeController';

function CreateEmojiTypeControllerFactory() {
  const createEmojiTypeController = new CreateEmojiTypeController();

  return createEmojiTypeController;
}

const createEmojiTypeController = CreateEmojiTypeControllerFactory();

export { createEmojiTypeController };
