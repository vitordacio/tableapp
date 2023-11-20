import { FindSocialNetworkTypesController } from '@controllers/SocialNetworkType/FindSocialNetworkTypesController';

function FindSocialNetworkTypesControllerFactory() {
  const findSocialNetworkTypesController =
    new FindSocialNetworkTypesController();

  return findSocialNetworkTypesController;
}

const findSocialNetworkTypesController =
  FindSocialNetworkTypesControllerFactory();

export { findSocialNetworkTypesController };
