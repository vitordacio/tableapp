import { UpdateCoverPhotoController } from '@controllers/User/UpdateGenerals/UpdateCoverPhotoController';

function UpdateCoverPhotoControllerFactory() {
  const updateCoverPhotoController = new UpdateCoverPhotoController();

  return updateCoverPhotoController;
}

const updateCoverPhotoController = UpdateCoverPhotoControllerFactory();

export { updateCoverPhotoController };
