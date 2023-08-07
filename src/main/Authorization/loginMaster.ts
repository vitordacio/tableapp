import { LoginMasterController } from '../../controllers/Authorization/LoginMasterController';

function LoginMasterControllerFactory() {
  const loginMasterController = new LoginMasterController();

  return loginMasterController;
}

const loginMasterController = LoginMasterControllerFactory();

export { loginMasterController };
