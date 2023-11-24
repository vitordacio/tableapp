import { FetchSocialNetworkTypesController } from '@controllers/Types/SocialNetworkType/FetchSocialNetworkTypesController';

function FetchSocialNetworkTypesControllerFactory() {
  const fetchSocialNetworkTypesController =
    new FetchSocialNetworkTypesController();

  return fetchSocialNetworkTypesController;
}

const fetchSocialNetworkTypesController =
  FetchSocialNetworkTypesControllerFactory();

export { fetchSocialNetworkTypesController };
