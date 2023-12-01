import { DeleteParticipationTypeController } from '@controllers/Types/ParticipationType/DeleteParticipationTypeController';

function DeleteParticipationTypeControllerFactory() {
  const deleteParticipationTypeController =
    new DeleteParticipationTypeController();

  return deleteParticipationTypeController;
}

const deleteParticipationTypeController =
  DeleteParticipationTypeControllerFactory();

export { deleteParticipationTypeController };
