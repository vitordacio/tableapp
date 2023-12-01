import { FetchParticipationTypesController } from '@controllers/Types/ParticipationType/FetchParticipationTypesController';

function FetchParticipationTypesControllerFactory() {
  const fetchParticipationTypesController =
    new FetchParticipationTypesController();

  return fetchParticipationTypesController;
}

const fetchParticipationTypesController =
  FetchParticipationTypesControllerFactory();

export { fetchParticipationTypesController };
