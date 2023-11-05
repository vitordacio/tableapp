import { UpdateBioController } from '@controllers/User/UpdateGenerals/UpdateBioController';

function UpdateBioControllerFactory() {
  const updateBioController = new UpdateBioController();

  return updateBioController;
}

const updateBioController = UpdateBioControllerFactory();

export { updateBioController };
