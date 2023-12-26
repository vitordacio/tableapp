import { CreateEmojiController } from '@controllers/Emoji/CreateEmojiController';

function CreateEmojiControllerFactory() {
  const createEmojiController = new CreateEmojiController();

  return createEmojiController;
}

const createEmojiController = CreateEmojiControllerFactory();

export { createEmojiController };
