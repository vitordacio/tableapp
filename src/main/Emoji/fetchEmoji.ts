import { FetchEmojiController } from '@controllers/Emoji/FetchEmojiController';

function FetchEmojiControllerFactory() {
  const fetchEmojiController = new FetchEmojiController();

  return fetchEmojiController;
}

const fetchEmojiController = FetchEmojiControllerFactory();

export { fetchEmojiController };
