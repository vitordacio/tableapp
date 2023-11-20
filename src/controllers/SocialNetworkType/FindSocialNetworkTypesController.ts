import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { pubPerm, userPerm } from '@config/constants';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { FindSocialNetworkTypesService } from '@services/SocialNetworkType/FindSocialNetworkTypes/FindSocialNetworkTypesService';

class FindSocialNetworkTypesController {
  private findSocialNetworkTypesService: FindSocialNetworkTypesService;

  constructor() {
    this.findSocialNetworkTypesService = container.resolve(
      FindSocialNetworkTypesService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const socialNetworkInstance =
      await this.findSocialNetworkTypesService.execute();

    return res.status(200).json(instanceToPlain(socialNetworkInstance));
  }
}

export { FindSocialNetworkTypesController };
