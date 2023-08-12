import { CreateParticipationResponseController } from '@controllers/Participation/CreateParticipationResponseController';

function createParticipationResponseControllerFactory() {
  const createParticipationResponseController =
    new CreateParticipationResponseController();

  return createParticipationResponseController;
}

const createParticipationResponseController =
  createParticipationResponseControllerFactory();

export { createParticipationResponseController };
