import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { CreateParticipationInviteService } from '@services/Participation/CreateParticipationInvite/CreateParticipationInviteService';

class CreateParticipationInviteController {
  private createParticipationInviteService: CreateParticipationInviteService;

  constructor() {
    this.createParticipationInviteService = container.resolve(
      CreateParticipationInviteService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, user_id, type } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const participationInstance =
      await this.createParticipationInviteService.execute({
        event_id,
        user_id,
        type,
        user: req.user,
      });

    return res.status(201).json(instanceToPlain(participationInstance));
  }
}

export { CreateParticipationInviteController };
