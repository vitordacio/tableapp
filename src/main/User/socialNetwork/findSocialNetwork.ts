import { FindSocialNetworkController } from '@controllers/User/SocialNetwork/FindSocialNetworkController';

function FindSocialNetworkControllerFactory() {
  const findSocialNetworkController = new FindSocialNetworkController();

  return findSocialNetworkController;
}

const findSocialNetworkController = FindSocialNetworkControllerFactory();

export { findSocialNetworkController };
