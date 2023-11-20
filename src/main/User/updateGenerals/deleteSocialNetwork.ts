import { DeleteSocialNetworkController } from '@controllers/User/UpdateGenerals/DeleteSocialNetworkController';

function DeleteSocialNetworkControllerFactory() {
  const deleteSocialNetworkController = new DeleteSocialNetworkController();

  return deleteSocialNetworkController;
}

const deleteSocialNetworkController = DeleteSocialNetworkControllerFactory();

export { deleteSocialNetworkController };
