import { CreateParticipationRequestController } from '@controllers/Participation/CreateParticipationRequestController';

function createParticipationRequestControllerFactory() {
  const createParticipationRequestController =
    new CreateParticipationRequestController();

  return createParticipationRequestController;
}

const createParticipationRequestController =
  createParticipationRequestControllerFactory();

export { createParticipationRequestController };
