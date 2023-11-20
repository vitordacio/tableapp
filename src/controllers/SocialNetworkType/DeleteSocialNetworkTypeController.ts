import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { masterPerm } from '@config/constants';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { DeleteSocialNetworkTypeService } from '@services/SocialNetworkType/DeleteSocialNetworkType/DeleteSocialNetworkTypeService';

class DeleteSocialNetworkTypeController {
  private deleteSocialNetworkTypeService: DeleteSocialNetworkTypeService;

  constructor() {
    this.deleteSocialNetworkTypeService = container.resolve(
      DeleteSocialNetworkTypeService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const socialNetworkInstance =
      await this.deleteSocialNetworkTypeService.execute(id);

    return res.status(201).json(instanceToPlain(socialNetworkInstance));
  }
}

export { DeleteSocialNetworkTypeController };
