import { FindAchievementTypesController } from '@controllers/Types/AchievementType/FindAchievementTypesController';

function FindAchievementTypesControllerFactory() {
  const findAchievementTypesController = new FindAchievementTypesController();

  return findAchievementTypesController;
}

const findAchievementTypesController = FindAchievementTypesControllerFactory();

export { findAchievementTypesController };
