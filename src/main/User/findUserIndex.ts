import { FindUserIndexController } from '@controllers/User/FindUserIndexController';

function FindUserIndexControllerFactory() {
  const findUserIndexController = new FindUserIndexController();

  return findUserIndexController;
}

const findUserIndexController = FindUserIndexControllerFactory();

export { findUserIndexController };
