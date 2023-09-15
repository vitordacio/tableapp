import { UpdateEmailController } from '@controllers/User/UpdateGenerals/UpdateEmailController';

function UpdateEmailControllerFactory() {
  const updateEmailController = new UpdateEmailController();

  return updateEmailController;
}

const updateEmailController = UpdateEmailControllerFactory();

export { updateEmailController };
