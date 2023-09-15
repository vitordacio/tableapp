import { UpdatePictureController } from '@controllers/User/UpdateGenerals/UpdatePictureController';

function UpdatePictureControllerFactory() {
  const updatePictureController = new UpdatePictureController();

  return updatePictureController;
}

const updatePictureController = UpdatePictureControllerFactory();

export { updatePictureController };
