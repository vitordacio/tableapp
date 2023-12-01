import { FindParticipationTypesController } from '@controllers/Types/ParticipationType/FindParticipationTypesController';

function FindParticipationTypesControllerFactory() {
  const findParticipationTypesController =
    new FindParticipationTypesController();

  return findParticipationTypesController;
}

const findParticipationTypesController =
  FindParticipationTypesControllerFactory();

export { findParticipationTypesController };
