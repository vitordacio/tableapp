import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindParticipationByEventIdService } from '@services/Participation/FindParticipation/FindParticipationByEventIdService';

class FindParticipationByEventIdController {
  private findParticipationByEventIdService: FindParticipationByEventIdService;

  constructor() {
    this.findParticipationByEventIdService = container.resolve(
      FindParticipationByEventIdService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id } = req.params;

    if (!event_id) {
      throw new AppError('Informe o event_id como parâmetro.', 400);
    }

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const participationInstance =
      await this.findParticipationByEventIdService.execute(event_id, req.user);

    return res.status(201).json(instanceToPlain(participationInstance));
  }
}

export { FindParticipationByEventIdController };