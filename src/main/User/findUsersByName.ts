import { FindUsersByNameController } from '@controllers/User/FindUsersByNameController';

function FindUsersByNameControllerFactory() {
  const findUsersByNameController = new FindUsersByNameController();

  return findUsersByNameController;
}

const findUsersByNameController = FindUsersByNameControllerFactory();

export { findUsersByNameController };
