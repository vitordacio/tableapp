import { CreateParticipationByEventController } from '@controllers/Participation/CreateParticipationByEventController';

function createParticipationByEventControllerFactory() {
  const createParticipationByEventController =
    new CreateParticipationByEventController();

  return createParticipationByEventController;
}

const createParticipationByEventController =
  createParticipationByEventControllerFactory();

export { createParticipationByEventController };
