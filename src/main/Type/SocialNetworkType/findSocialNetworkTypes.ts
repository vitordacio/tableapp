import { FindSocialNetworkTypesController } from '@controllers/Types/SocialNetworkType/FindSocialNetworkTypesController';

function FindSocialNetworkTypesControllerFactory() {
  const findSocialNetworkTypesController =
    new FindSocialNetworkTypesController();

  return findSocialNetworkTypesController;
}

const findSocialNetworkTypesController =
  FindSocialNetworkTypesControllerFactory();

export { findSocialNetworkTypesController };
