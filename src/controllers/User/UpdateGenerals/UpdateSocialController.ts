import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateSocialService } from '@services/User/UpdateUser/Generals/UpdateSocialService';

class UpdateSocialController {
  private updateSocialService: UpdateSocialService;

  constructor() {
    this.updateSocialService = container.resolve(UpdateSocialService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { social, username } = req.body;

    if (!hasPermission(req.user, userPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const user = await this.updateSocialService.execute({
      social,
      username,
      user: req.user,
    });

    return res.status(200).json(instanceToPlain(user));
  }
}

export { UpdateSocialController };
