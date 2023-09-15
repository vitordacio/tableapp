import { UpdatePrivateController } from '@controllers/User/UpdateGenerals/UpdatePrivateController';

function UpdatePrivateControllerFactory() {
  const updatePrivateController = new UpdatePrivateController();

  return updatePrivateController;
}

const updatePrivateController = UpdatePrivateControllerFactory();

export { updatePrivateController };
