import { UpdateNameController } from '@controllers/User/UpdateGenerals/UpdateNameController';

function UpdateNameControllerFactory() {
  const updateNameController = new UpdateNameController();

  return updateNameController;
}

const updateNameController = UpdateNameControllerFactory();

export { updateNameController };
