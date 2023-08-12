import { FindParticipationIndexController } from '@controllers/Participation/FindParticipationIndexController';

function FindParticipationIndexControllerFactory() {
  const findParticipationIndexController =
    new FindParticipationIndexController();

  return findParticipationIndexController;
}

const findParticipationIndexController =
  FindParticipationIndexControllerFactory();

export { findParticipationIndexController };
