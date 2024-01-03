import { UpdateMomentController } from '@controllers/Moment/UpdateMomentController';

function UpdateMomentControllerFactory() {
  const updateMomentController = new UpdateMomentController();

  return updateMomentController;
}

const updateMomentController = UpdateMomentControllerFactory();

export { updateMomentController };
