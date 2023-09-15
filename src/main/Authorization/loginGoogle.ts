import { LoginGoogleController } from '../../controllers/Authorization/LoginGoogleController';

function LoginGoogleControllerFactory() {
  const loginGoogleController = new LoginGoogleController();

  return loginGoogleController;
}

const loginGoogleController = LoginGoogleControllerFactory();

export { loginGoogleController };
