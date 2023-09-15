import { UpdateUsernameController } from '@controllers/User/UpdateGenerals/UpdateUsernameController';

function UpdateUsernameControllerFactory() {
  const updateUsernameController = new UpdateUsernameController();

  return updateUsernameController;
}

const updateUsernameController = UpdateUsernameControllerFactory();

export { updateUsernameController };
