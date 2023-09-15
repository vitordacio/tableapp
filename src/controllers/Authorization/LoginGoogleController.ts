import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoginGoogleService } from '@services/Authorization/Login/LoginGoogleService';

class LoginGoogleController {
  private loginGoogleService: LoginGoogleService;

  constructor() {
    this.loginGoogleService = container.resolve(LoginGoogleService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { credential } = req.body;

    const { accessToken, user } = await this.loginGoogleService.execute(
      credential,
    );

    return res.status(200).json({
      user: instanceToInstance(user),
      accessToken,
    });
  }
}

export { LoginGoogleController };
