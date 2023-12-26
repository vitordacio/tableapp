import { FetchEmojiTypesController } from '@controllers/Types/EmojiType/FetchEmojiTypesController';

function FetchEmojiTypesControllerFactory() {
  const fetchEmojiTypesController = new FetchEmojiTypesController();

  return fetchEmojiTypesController;
}

const fetchEmojiTypesController = FetchEmojiTypesControllerFactory();

export { fetchEmojiTypesController };
