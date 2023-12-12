import { FindParticipationsByEventIdController } from '@controllers/Participation/FindParticipationsByEventIdController';

function FindParticipationsByEventIdControllerFactory() {
  const findParticipationsByEventIdController =
    new FindParticipationsByEventIdController();

  return findParticipationsByEventIdController;
}

const findParticipationsByEventIdController =
  FindParticipationsByEventIdControllerFactory();

export { findParticipationsByEventIdController };
