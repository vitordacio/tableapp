import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindParticipationByIdService } from '@services/Participation/FindParticipation/FindParticipationByIdService';

class FindParticipationByIdController {
  private findParticipationByIdService: FindParticipationByIdService;

  constructor() {
    this.findParticipationByIdService = container.resolve(
      FindParticipationByIdService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { participation_id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const participationInstance =
      await this.findParticipationByIdService.execute(participation_id);

    return res.status(201).json(instanceToPlain(participationInstance));
  }
}

export { FindParticipationByIdController };
