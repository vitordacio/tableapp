import { UpdateGenderController } from '@controllers/User/UpdateGenerals/UpdateGenderController';

function UpdateGenderControllerFactory() {
  const updateGenderController = new UpdateGenderController();

  return updateGenderController;
}

const updateGenderController = UpdateGenderControllerFactory();

export { updateGenderController };
