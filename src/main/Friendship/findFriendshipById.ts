import { FindFriendshipByIdController } from '@controllers/Friendship/FindFriendshipByIdController';

function FindFriendshipByIdControllerFactory() {
  const findFriendshipByIdController = new FindFriendshipByIdController();

  return findFriendshipByIdController;
}

const findFriendshipByIdController = FindFriendshipByIdControllerFactory();

export { findFriendshipByIdController };
