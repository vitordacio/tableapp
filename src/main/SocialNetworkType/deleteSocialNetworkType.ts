import { DeleteSocialNetworkTypeController } from '@controllers/SocialNetworkType/DeleteSocialNetworkTypeController';

function DeleteSocialNetworkTypeControllerFactory() {
  const deleteSocialNetworkTypeController =
    new DeleteSocialNetworkTypeController();

  return deleteSocialNetworkTypeController;
}

const deleteSocialNetworkTypeController =
  DeleteSocialNetworkTypeControllerFactory();

export { deleteSocialNetworkTypeController };
