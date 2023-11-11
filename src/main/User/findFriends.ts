import { FindFriendsController } from '@controllers/User/FindFriendsController';

function FindFriendsControllerFactory() {
  const findFriendsController = new FindFriendsController();

  return findFriendsController;
}

const findFriendsController = FindFriendsControllerFactory();

export { findFriendsController };
