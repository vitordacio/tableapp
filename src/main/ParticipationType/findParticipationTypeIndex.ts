import { FindParticipationTypeIndexController } from '@controllers/ParticipationType/FindParticipationTypeIndexController';

function FindParticipationTypeIndexControllerFactory() {
  const findParticipationTypeIndexController =
    new FindParticipationTypeIndexController();

  return findParticipationTypeIndexController;
}

const findParticipationTypeIndexController =
  FindParticipationTypeIndexControllerFactory();

export { findParticipationTypeIndexController };
