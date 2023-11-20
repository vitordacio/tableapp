import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { pubPerm, userPerm } from '@config/constants';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { DeleteSocialNetworkService } from '@services/User/UpdateUser/DeleteSocialNetworkService';

class DeleteSocialNetworkController {
  private deleteSocialNetworkService: DeleteSocialNetworkService;

  constructor() {
    this.deleteSocialNetworkService = container.resolve(
      DeleteSocialNetworkService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const socialNetworkInstance = await this.deleteSocialNetworkService.execute(
      id,
      req.user,
    );

    return res.status(201).json(instanceToPlain(socialNetworkInstance));
  }
}

export { DeleteSocialNetworkController };
