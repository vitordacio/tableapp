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

    // res.cookie('autocenter.access-token', accessToken, {
    //   path: '/',
    //   maxAge: 60 * 60 * 24 * 7 * 360, // 6h -- 1 year
    // });

    // res.cookie('JID', refreshToken, {
    //   path: '/',
    //   httpOnly: true,
    //   maxAge: 60 * 60 * 24 * 7 * 360, // 1 week -- 1 year
    // });
    return res.status(200).json({
      user: instanceToInstance(user),
      accessToken,
    });
  }
}

export { LoginPubController };
