import { FindAchievementsByUserIdController } from '@controllers/Achievement/FindAchievementsByUserIdController';

function FindAchievementsByUserIdControllerFactory() {
  const findAchievementsByUserIdController =
    new FindAchievementsByUserIdController();

  return findAchievementsByUserIdController;
}

const findAchievementsByUserIdController =
  FindAchievementsByUserIdControllerFactory();

export { findAchievementsByUserIdController };
