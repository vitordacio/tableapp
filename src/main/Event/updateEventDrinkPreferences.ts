import { UpdateEventDrinkPreferencesController } from '@controllers/Event/UpdateEventDrinkPreferencesController';

function UpdateEventDrinkPreferencesControllerFactory() {
  const updateEventDrinkPreferencesController =
    new UpdateEventDrinkPreferencesController();

  return updateEventDrinkPreferencesController;
}

const updateEventDrinkPreferencesController =
  UpdateEventDrinkPreferencesControllerFactory();

export { updateEventDrinkPreferencesController };
