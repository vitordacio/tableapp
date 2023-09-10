import { FindParticipationsByUserController } from '@controllers/Participation/FindParticipationsByUserController';

function FindParticipationByUserControllerFactory() {
  const findParticipationsByUserController =
    new FindParticipationsByUserController();

  return findParticipationsByUserController;
}

const findParticipationsByUserController =
  FindParticipationByUserControllerFactory();

export { findParticipationsByUserController };
