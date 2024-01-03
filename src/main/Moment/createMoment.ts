import { CreateMomentController } from '@controllers/Moment/CreateMomentController';

function CreateMomentControllerFactory() {
  const createMomentController = new CreateMomentController();

  return createMomentController;
}

const createMomentController = CreateMomentControllerFactory();

export { createMomentController };
