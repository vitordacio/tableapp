import { FindUserByNameController } from '@controllers/User/FindUserByNameController';

function FindUserdByNameControllerFactory() {
  const findUserdByNameController = new FindUserByNameController();

  return findUserdByNameController;
}

const findUserdByNameController = FindUserdByNameControllerFactory();

export { findUserdByNameController };
