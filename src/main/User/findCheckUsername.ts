import { FindCheckUsernameController } from '@controllers/User/FindCheckUsernameController';

function FindCheckUsernameControllerFactory() {
  const findCheckUsernameController = new FindCheckUsernameController();

  return findCheckUsernameController;
}

const findCheckUsernameController = FindCheckUsernameControllerFactory();

export { findCheckUsernameController };
