import { FindUserFriendsController } from '@controllers/User/FindUserFriendsController';

function FindUserFriendsControllerFactory() {
  const findUserFriendsController = new FindUserFriendsController();

  return findUserFriendsController;
}

const findUserFriendsController = FindUserFriendsControllerFactory();

export { findUserFriendsController };
