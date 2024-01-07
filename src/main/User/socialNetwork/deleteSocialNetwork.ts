import { DeleteSocialNetworkController } from '@controllers/User/SocialNetwork/DeleteSocialNetworkController';

function DeleteSocialNetworkControllerFactory() {
  const deleteSocialNetworkController = new DeleteSocialNetworkController();

  return deleteSocialNetworkController;
}

const deleteSocialNetworkController = DeleteSocialNetworkControllerFactory();

export { deleteSocialNetworkController };
