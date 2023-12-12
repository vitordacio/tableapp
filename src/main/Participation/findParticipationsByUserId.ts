import { FindParticipationsByUserIdController } from '@controllers/Participation/FindParticipationsByUserIdController';

function FindParticipationsByUserIdControllerFactory() {
  const findParticipationsByUserIdController =
    new FindParticipationsByUserIdController();

  return findParticipationsByUserIdController;
}

const findParticipationsByUserIdController =
  FindParticipationsByUserIdControllerFactory();

export { findParticipationsByUserIdController };
