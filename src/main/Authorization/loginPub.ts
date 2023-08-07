import { LoginPubController } from '../../controllers/Authorization/LoginPubController';

function LoginPubControllerFactory() {
  const loginPubController = new LoginPubController();

  return loginPubController;
}

const loginPubController = LoginPubControllerFactory();

export { loginPubController };
