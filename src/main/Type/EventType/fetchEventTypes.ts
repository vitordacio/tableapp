import { FetchEventTypesController } from '@controllers/Types/EventType/FetchEventTypesController';

function FetchEventTypesControllerFactory() {
  const fetchEventTypesController = new FetchEventTypesController();

  return fetchEventTypesController;
}

const fetchEventTypesController = FetchEventTypesControllerFactory();

export { fetchEventTypesController };
