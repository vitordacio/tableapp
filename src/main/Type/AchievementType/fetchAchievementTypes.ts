import { FetchAchievementTypesController } from '@controllers/Types/AchievementType/FetchAchievementTypesController';

function FetchAchievementTypesControllerFactory() {
  const fetchAchievementTypesController = new FetchAchievementTypesController();

  return fetchAchievementTypesController;
}

const fetchAchievementTypesController =
  FetchAchievementTypesControllerFactory();

export { fetchAchievementTypesController };
