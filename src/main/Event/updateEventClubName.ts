import { UpdateEventClubNameController } from '@controllers/Event/UpdateEventClubNameController';

function UpdateEventClubNameControllerFactory() {
  const updateEventClubNameController = new UpdateEventClubNameController();

  return updateEventClubNameController;
}

const updateEventClubNameController = UpdateEventClubNameControllerFactory();

export { updateEventClubNameController };
