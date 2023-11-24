import { DeleteSocialNetworkTypeController } from '@controllers/Types/SocialNetworkType/DeleteSocialNetworkTypeController';

function DeleteSocialNetworkTypeControllerFactory() {
  const deleteSocialNetworkTypeController =
    new DeleteSocialNetworkTypeController();

  return deleteSocialNetworkTypeController;
}

const deleteSocialNetworkTypeController =
  DeleteSocialNetworkTypeControllerFactory();

export { deleteSocialNetworkTypeController };
