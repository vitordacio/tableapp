import { CreateSocialNetworkController } from '@controllers/SocialNetwork/CreateSocialNetworkController';

function CreateSocialNetworkControllerFactory() {
  const createSocialNetworkController = new CreateSocialNetworkController();

  return createSocialNetworkController;
}

const createSocialNetworkController = CreateSocialNetworkControllerFactory();

export { createSocialNetworkController };
