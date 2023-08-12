import { FindParticipationByIdController } from '@controllers/Participation/FindParticipationByIdController';

function FindParticipationByIdControllerFactory() {
  const findParticipationByIdController = new FindParticipationByIdController();

  return findParticipationByIdController;
}

const findParticipationByIdController =
  FindParticipationByIdControllerFactory();

export { findParticipationByIdController };
