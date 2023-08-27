import { FindParticipationByEventIdController } from '@controllers/Participation/FindParticipatioByEventIdController';

function FindParticipationByEventIdControllerFactory() {
  const findParticipationByEventIdController =
    new FindParticipationByEventIdController();

  return findParticipationByEventIdController;
}

const findParticipationByEventIdController =
  FindParticipationByEventIdControllerFactory();

export { findParticipationByEventIdController };
