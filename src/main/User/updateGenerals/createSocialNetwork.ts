import { CreateSocialNetworkController } from '@controllers/User/UpdateGenerals/CreateSocialNetworkController';

function CreateSocialNetworkControllerFactory() {
  const createSocialNetworkController = new CreateSocialNetworkController();

  return createSocialNetworkController;
}

const createSocialNetworkController = CreateSocialNetworkControllerFactory();

export { createSocialNetworkController };
