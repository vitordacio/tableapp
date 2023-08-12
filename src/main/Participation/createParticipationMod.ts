import { CreateParticipationModController } from '@controllers/Participation/CreateParticipationModController';

function createParticipationModControllerFactory() {
  const createParticipationModController =
    new CreateParticipationModController();

  return createParticipationModController;
}

const createParticipationModController =
  createParticipationModControllerFactory();

export { createParticipationModController };
