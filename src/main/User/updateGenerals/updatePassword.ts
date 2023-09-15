import { UpdatePasswordController } from '@controllers/User/UpdateGenerals/UpdatePasswordController';

function UpdatePasswordControllerFactory() {
  const updatePasswordController = new UpdatePasswordController();

  return updatePasswordController;
}

const updatePasswordController = UpdatePasswordControllerFactory();

export { updatePasswordController };
