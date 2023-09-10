import { CreateParticipationByUserController } from '@controllers/Participation/CreateParticipationByUserController';

function createParticipationByUserControllerFactory() {
  const createParticipationByUserController =
    new CreateParticipationByUserController();

  return createParticipationByUserController;
}

const createParticipationByUserController =
  createParticipationByUserControllerFactory();

export { createParticipationByUserController };
