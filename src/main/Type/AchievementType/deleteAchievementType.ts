import { DeleteAchievementTypeController } from '@controllers/Types/AchievementType/DeleteAchievementTypeController';

function DeleteAchievementTypeControllerFactory() {
  const deleteAchievementTypeController = new DeleteAchievementTypeController();

  return deleteAchievementTypeController;
}

const deleteAchievementTypeController =
  DeleteAchievementTypeControllerFactory();

export { deleteAchievementTypeController };
