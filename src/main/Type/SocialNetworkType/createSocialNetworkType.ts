import { CreateSocialNetworkTypeController } from '@controllers/Types/SocialNetworkType/CreateSocialNetworkTypeController';

function CreateSocialNetworkTypeControllerFactory() {
  const createSocialNetworkTypeController =
    new CreateSocialNetworkTypeController();

  return createSocialNetworkTypeController;
}

const createSocialNetworkTypeController =
  CreateSocialNetworkTypeControllerFactory();

export { createSocialNetworkTypeController };
