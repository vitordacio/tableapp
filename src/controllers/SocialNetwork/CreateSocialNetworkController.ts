import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { pubPerm, userPerm } from '@config/constants';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { CreateSocialNetworkService } from '@services/SocialNetwork/CreateSocialNetwork/CreaterSocialNetworkService';

class CreateSocialNetworkController {
  private createSocialNetworkService: CreateSocialNetworkService;

  constructor() {
    this.createSocialNetworkService = container.resolve(
      CreateSocialNetworkService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { username, type } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const socialNetworkInstance = await this.createSocialNetworkService.execute(
      {
        username,
        type,
        user: req.user,
      },
    );

    return res.status(201).json(instanceToPlain(socialNetworkInstance));
  }
}

export { CreateSocialNetworkController };
