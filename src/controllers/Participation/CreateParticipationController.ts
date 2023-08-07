import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { CreateParticipationService } from '@services/Participation/CreateParticipation/CreateParticipationService';

class CreateParticipationController {
  private createParticipationService: CreateParticipationService;

  constructor() {
    this.createParticipationService = container.resolve(
      CreateParticipationService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const participationInstance = await this.createParticipationService.execute(
      {
        event_id,
        user: req.user,
      },
    );

    return res.status(201).json(instanceToPlain(participationInstance));
  }
}

export { CreateParticipationController };
