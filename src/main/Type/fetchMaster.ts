import { FetchMasterController } from '@controllers/Types/FetchMasterController';

function FetchMasterControllerFactory() {
  const fetchMasterController = new FetchMasterController();

  return fetchMasterController;
}

const fetchMasterController = FetchMasterControllerFactory();

export { fetchMasterController };
