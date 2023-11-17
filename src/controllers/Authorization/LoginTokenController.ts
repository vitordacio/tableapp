import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { pubPerm, userPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { LoginTokenService } from '@services/Authorization/Login/LoginTokenService';

class LoginTokenController {
  private loginTokenService: LoginTokenService;

  constructor() {
    this.loginTokenService = container.resolve(LoginTokenService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const { accessToken, user } = await this.loginTokenService.execute(
      req.user,
    );

    return res.status(200).json({
      user: instanceToInstance(user),
      accessToken,
    });
  }
}

export { LoginTokenController };
