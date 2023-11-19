import { DeleteSocialNetworkController } from '@controllers/SocialNetwork/DeleteSocialNetworkController';

function DeleteSocialNetworkControllerFactory() {
  const deleteSocialNetworkController = new DeleteSocialNetworkController();

  return deleteSocialNetworkController;
}

const deleteSocialNetworkController = DeleteSocialNetworkControllerFactory();

export { deleteSocialNetworkController };
