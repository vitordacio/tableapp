import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindParticipationIndexService } from '@services/Participation/FindParticipation/FindParticipationIndexService';

class FindParticipationIndexController {
  private findParticipationIndexService: FindParticipationIndexService;

  constructor() {
    this.findParticipationIndexService = container.resolve(
      FindParticipationIndexService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const ParticipationInstance =
      await this.findParticipationIndexService.execute();

    return res.status(201).json(instanceToPlain(ParticipationInstance));
  }
}

export { FindParticipationIndexController };
