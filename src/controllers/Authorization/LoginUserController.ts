import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoginUserService } from '@services/Authorization/Login/LoginUserService';

class LoginUserController {
  private loginUserService: LoginUserService;

  constructor() {
    this.loginUserService = container.resolve(LoginUserService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { login, password } = req.body;

    const { accessToken, user } = await this.loginUserService.execute({
      login,
      password,
    });

    return res.status(200).json({
      user: instanceToInstance(user),
      accessToken,
    });
  }
}

export { LoginUserController };
