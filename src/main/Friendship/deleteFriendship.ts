import { DeleteFriendshipController } from '@controllers/Friendship/DeleteFriendshipController';

function DeleteFriendshipControllerFactory() {
  const deleteFriendshipController = new DeleteFriendshipController();

  return deleteFriendshipController;
}

const deleteFriendshipController = DeleteFriendshipControllerFactory();

export { deleteFriendshipController };
