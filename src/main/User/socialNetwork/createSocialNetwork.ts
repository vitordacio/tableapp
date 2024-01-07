import { CreateSocialNetworkController } from '@controllers/User/SocialNetwork/CreateSocialNetworkController';

function CreateSocialNetworkControllerFactory() {
  const createSocialNetworkController = new CreateSocialNetworkController();

  return createSocialNetworkController;
}

const createSocialNetworkController = CreateSocialNetworkControllerFactory();

export { createSocialNetworkController };
