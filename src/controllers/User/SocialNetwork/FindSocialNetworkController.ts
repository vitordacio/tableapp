import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { pubPerm, userPerm } from '@config/constants';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { FindSocialNetworkService } from '@services/User/SocialNetwork/FindSocialNetworkService';

class FindSocialNetworkController {
  private findSocialNetworkService: FindSocialNetworkService;

  constructor() {
    this.findSocialNetworkService = container.resolve(FindSocialNetworkService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const socialNetworkInstance = await this.findSocialNetworkService.execute(
      req.user,
    );

    return res.status(201).json(instanceToPlain(socialNetworkInstance));
  }
}

export { FindSocialNetworkController };
