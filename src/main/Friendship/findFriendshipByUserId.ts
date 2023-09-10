import { FindFriendshipByUserIdController } from '@controllers/Friendship/FindFriendshipByUserIdController';

function FindFriendshipByUserIdControllerFactory() {
  const findFriendshipByUserIdController =
    new FindFriendshipByUserIdController();

  return findFriendshipByUserIdController;
}

const findFriendshipByUserIdController =
  FindFriendshipByUserIdControllerFactory();

export { findFriendshipByUserIdController };
