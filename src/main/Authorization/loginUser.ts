import { LoginUserController } from '../../controllers/Authorization/LoginUserController';

function LoginUserControllerFactory() {
  const loginUserController = new LoginUserController();

  return loginUserController;
}

const loginUserController = LoginUserControllerFactory();

export { loginUserController };
