import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { CreateInviteRequestService } from '@services/Participation/CreateInviteRequest/CreateInviteRequestService';

class CreateInviteRequestController {
  private createInviteRequestService: CreateInviteRequestService;

  constructor() {
    this.createInviteRequestService = container.resolve(
      CreateInviteRequestService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, user_id, type_id } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const participationInstance = await this.createInviteRequestService.execute(
      {
        event_id,
        user_id,
        type_id,
        user: req.user,
      },
    );

    return res.status(201).json(instanceToPlain(participationInstance));
  }
}

export { CreateInviteRequestController };
