import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { masterPerm } from '@config/constants';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { CreateSocialNetworkTypeService } from '@services/SocialNetworkType/CreateSocialNetworkType/CreaterSocialNetworkTypeService';

class CreateSocialNetworkTypeController {
  private createSocialNetworkTypeService: CreateSocialNetworkTypeService;

  constructor() {
    this.createSocialNetworkTypeService = container.resolve(
      CreateSocialNetworkTypeService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { type, base_url, deep_link } = req.body;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const socialNetworkInstance =
      await this.createSocialNetworkTypeService.execute({
        type,
        base_url,
        deep_link,
      });

    return res.status(201).json(instanceToPlain(socialNetworkInstance));
  }
}

export { CreateSocialNetworkTypeController };
