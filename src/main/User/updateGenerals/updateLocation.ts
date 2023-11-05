import { UpdateLocationController } from '@controllers/User/UpdateGenerals/UpdateLocationController';

function UpdateLocationControllerFactory() {
  const updateLocationController = new UpdateLocationController();

  return updateLocationController;
}

const updateLocationController = UpdateLocationControllerFactory();

export { updateLocationController };
