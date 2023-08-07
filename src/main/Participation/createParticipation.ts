import { CreateParticipationController } from '@controllers/Participation/CreateParticipationController';

function CreateParticipationControllerFactory() {
  const createParticipationController = new CreateParticipationController();

  return createParticipationController;
}

const createParticipationController = CreateParticipationControllerFactory();

export { createParticipationController };
