import { FindEmojiFaceController } from '@controllers/Emoji/FindEmojiFaceController';

function FindEmojiFaceControllerFactory() {
  const findEmojiFaceController = new FindEmojiFaceController();

  return findEmojiFaceController;
}

const findEmojiFaceController = FindEmojiFaceControllerFactory();

export { findEmojiFaceController };
