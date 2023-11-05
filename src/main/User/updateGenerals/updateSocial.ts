import { UpdateSocialController } from '@controllers/User/UpdateGenerals/UpdateSocialController';

function UpdateSocialControllerFactory() {
  const updateSocialController = new UpdateSocialController();

  return updateSocialController;
}

const updateSocialController = UpdateSocialControllerFactory();

export { updateSocialController };
