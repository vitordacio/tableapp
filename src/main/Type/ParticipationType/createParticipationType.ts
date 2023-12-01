import { CreateParticipationTypeController } from '@controllers/Types/ParticipationType/CreateParticipationTypeController';

function CreateParticipationTypeControllerFactory() {
  const createParticipationTypeController =
    new CreateParticipationTypeController();

  return createParticipationTypeController;
}

const createParticipationTypeController =
  CreateParticipationTypeControllerFactory();

export { createParticipationTypeController };
