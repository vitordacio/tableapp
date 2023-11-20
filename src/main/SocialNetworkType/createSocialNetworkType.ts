import { CreateSocialNetworkTypeController } from '@controllers/SocialNetworkType/CreateSocialNetworkTypeController';

function CreateSocialNetworkTypeControllerFactory() {
  const createSocialNetworkTypeController =
    new CreateSocialNetworkTypeController();

  return createSocialNetworkTypeController;
}

const createSocialNetworkTypeController =
  CreateSocialNetworkTypeControllerFactory();

export { createSocialNetworkTypeController };
