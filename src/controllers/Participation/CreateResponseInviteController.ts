import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { CreateResponseInviteService } from '@services/Participation/CreateResponseInvite/CreateResponseInviteService';

class CreateResponseInviteController {
  private createResponseService: CreateResponseInviteService;

  constructor() {
    this.createResponseService = container.resolve(CreateResponseInviteService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { participation_id, confirmed_by_user } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const participationInstance = await this.createResponseService.execute({
      participation_id,
      confirmed_by_user,
      user: req.user,
    });

    return res.status(201).json(instanceToPlain(participationInstance));
  }
}

export { CreateResponseInviteController };
