import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoginPubService } from '@services/Authorization/Login/LoginPubService';

class LoginPubController {
  private loginPubService: LoginPubService;

  constructor() {
    this.loginPubService = container.resolve(LoginPubService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { login, password } = req.body;

    const { accessToken, user } = await this.loginPubService.execute({
      login,
      password,
    });

    return res.status(200).json({
      user: instanceToInstance(user),
      accessToken,
    });
  }
}

export { LoginPubController };
