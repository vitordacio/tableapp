import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { DeleteParticipationService } from '@services/Participation/DeleteParticipation/DeleteParticipationService';

class DeleteParticipationController {
  private deleteParticipationService: DeleteParticipationService;

  constructor() {
    this.deleteParticipationService = container.resolve(
      DeleteParticipationService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const ParticipationInstance = await this.deleteParticipationService.execute(
      id,
    );

    return res.status(201).json(instanceToPlain(ParticipationInstance));
  }
}

export { DeleteParticipationController };
