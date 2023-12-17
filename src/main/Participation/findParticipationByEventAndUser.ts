import { FindParticipationByEventAndUserController } from '@controllers/Participation/FindParticipationByEventAndUserController';

function FindParticipationByEventAndUserControllerFactory() {
  const findParticipationByEventAndUserController =
    new FindParticipationByEventAndUserController();

  return findParticipationByEventAndUserController;
}

const findParticipationByEventAndUserController =
  FindParticipationByEventAndUserControllerFactory();

export { findParticipationByEventAndUserController };
