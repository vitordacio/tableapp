import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { CreateInviteService } from '@services/Participation/CreateInvite/CreateInviteService';

class CreateInviteController {
  private createInviteService: CreateInviteService;

  constructor() {
    this.createInviteService = container.resolve(CreateInviteService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, user_id, type } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const participationInstance = await this.createInviteService.execute({
      event_id,
      user_id,
      user: req.user,
      type,
    });

    return res.status(201).json(instanceToPlain(participationInstance));
  }
}

export { CreateInviteController };
