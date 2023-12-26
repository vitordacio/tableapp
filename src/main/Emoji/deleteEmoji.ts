import { DeleteEmojiController } from '@controllers/Emoji/DeleteEmojiController';

function DeleteEmojiControllerFactory() {
  const deleteEmojiController = new DeleteEmojiController();

  return deleteEmojiController;
}

const deleteEmojiController = DeleteEmojiControllerFactory();

export { deleteEmojiController };
