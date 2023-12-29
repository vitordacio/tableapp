import { CreateEventPerformerController } from '@controllers/Event/CreateEventPerformerController';

function CreateEventPerformerControllerFactory() {
  const createEventPerformerController = new CreateEventPerformerController();

  return createEventPerformerController;
}

const createEventPerformerController = CreateEventPerformerControllerFactory();

export { createEventPerformerController };
