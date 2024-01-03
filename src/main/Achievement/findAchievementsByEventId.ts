import { FindAchievementsByEventIdController } from '@controllers/Achievement/FindAchievementsByEventIdController';

function FindAchievementsByEventIdControllerFactory() {
  const findAchievementsByEventIdController =
    new FindAchievementsByEventIdController();

  return findAchievementsByEventIdController;
}

const findAchievementsByEventIdController =
  FindAchievementsByEventIdControllerFactory();

export { findAchievementsByEventIdController };
