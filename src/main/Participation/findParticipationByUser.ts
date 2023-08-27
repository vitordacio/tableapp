import { FindParticipationByUserController } from '@controllers/Participation/FindParticipationByUserController';

function FindParticipationByUserControllerFactory() {
  const findParticipationByUserController =
    new FindParticipationByUserController();

  return findParticipationByUserController;
}

const findParticipationByUserController =
  FindParticipationByUserControllerFactory();

export { findParticipationByUserController };
