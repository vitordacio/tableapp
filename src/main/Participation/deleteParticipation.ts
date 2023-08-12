import { DeleteParticipationController } from '@controllers/Participation/DeleteParticipationController';

function DeleteParticipationControllerFactory() {
  const deleteParticipationController = new DeleteParticipationController();

  return deleteParticipationController;
}

const deleteParticipationController = DeleteParticipationControllerFactory();

export { deleteParticipationController };
