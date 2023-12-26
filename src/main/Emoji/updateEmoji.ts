import { UpdateEmojiController } from '@controllers/Emoji/UpdateEmojiController';

function UpdateEmojiControllerFactory() {
  const updateEmojiController = new UpdateEmojiController();

  return updateEmojiController;
}

const updateEmojiController = UpdateEmojiControllerFactory();

export { updateEmojiController };
