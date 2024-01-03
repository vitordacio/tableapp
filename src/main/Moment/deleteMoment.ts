import { DeleteMomentController } from '@controllers/Moment/DeleteMomentController';

function DeleteMomentControllerFactory() {
  const deleteMomentController = new DeleteMomentController();

  return deleteMomentController;
}

const deleteMomentController = DeleteMomentControllerFactory();

export { deleteMomentController };
