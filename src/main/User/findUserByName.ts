import { FindUserByNameController } from '@controllers/User/FindUserByNameController';

function FindUserByNameControllerFactory() {
  const findUserByNameController = new FindUserByNameController();

  return findUserByNameController;
}

const findUserByNameController = FindUserByNameControllerFactory();

export { findUserByNameController };
