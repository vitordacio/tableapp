import { CreateAchievementTypeController } from '@controllers/Types/AchievementType/CreateAchievementTypeController';

function CreateAchievementTypeControllerFactory() {
  const createAchievementTypeController = new CreateAchievementTypeController();

  return createAchievementTypeController;
}

const createAchievementTypeController =
  CreateAchievementTypeControllerFactory();

export { createAchievementTypeController };
