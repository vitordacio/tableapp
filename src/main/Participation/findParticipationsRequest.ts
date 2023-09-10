import { FindParticipationsRequestController } from '@controllers/Participation/FindParticipationsRequestController';

function FindParticipationsRequestControllerFactory() {
  const findParticipationsRequestController =
    new FindParticipationsRequestController();

  return findParticipationsRequestController;
}

const findParticipationsRequestController =
  FindParticipationsRequestControllerFactory();

export { findParticipationsRequestController };
