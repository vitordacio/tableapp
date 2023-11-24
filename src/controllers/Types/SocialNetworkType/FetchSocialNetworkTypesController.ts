import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { pubPerm, userPerm } from '@config/constants';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { FetchSocialNetworkTypesService } from '@services/Types/SocialNetworkType/FetchSocialNetworkTypes/FetchSocialNetworkTypesService';

class FetchSocialNetworkTypesController {
  private fetchSocialNetworkTypesService: FetchSocialNetworkTypesService;

  constructor() {
    this.fetchSocialNetworkTypesService = container.resolve(
      FetchSocialNetworkTypesService,
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
      await this.fetchSocialNetworkTypesService.execute();

    return res.status(201).json(instanceToPlain(socialNetworkInstance));
  }
}

export { FetchSocialNetworkTypesController };
