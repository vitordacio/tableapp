import { DeleteEmojiTypeController } from '@controllers/Types/EmojiType/DeleteEmojiTypeController';

function DeleteEmojiTypeControllerFactory() {
  const deleteEmojiTypeController = new DeleteEmojiTypeController();

  return deleteEmojiTypeController;
}

const deleteEmojiTypeController = DeleteEmojiTypeControllerFactory();

export { deleteEmojiTypeController };
