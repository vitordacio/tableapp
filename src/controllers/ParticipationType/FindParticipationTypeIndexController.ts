import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindParticipationTypeIndexService } from '@services/ParticipationType/FindParticipationType/FindParticipationTypeIndexService';

class FindParticipationTypeIndexController {
  private findParticipationTypeIndexService: FindParticipationTypeIndexService;

  constructor() {
    this.findParticipationTypeIndexService = container.resolve(
      FindParticipationTypeIndexService,
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
      await this.findParticipationTypeIndexService.execute();

    return res.status(201).json(instanceToPlain(ParticipationInstance));
  }
}

export { FindParticipationTypeIndexController };
