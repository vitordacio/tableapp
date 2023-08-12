import { DeleteParticipationTypeController } from '@controllers/ParticipationType/DeleteParticipationTypeController';

function DeleteParticipationTypeControllerFactory() {
  const deleteParticipationTypeController =
    new DeleteParticipationTypeController();

  return deleteParticipationTypeController;
}

const deleteParticipationTypeController =
  DeleteParticipationTypeControllerFactory();

export { deleteParticipationTypeController };
