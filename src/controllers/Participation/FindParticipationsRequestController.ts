import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindParticipationsRequestService } from '@services/Participation/FindParticipation/FindParticipationsRequestService';

class FindParticipationsRequestController {
  private findParticipationsRequestService: FindParticipationsRequestService;

  constructor() {
    this.findParticipationsRequestService = container.resolve(
      FindParticipationsRequestService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const participationInstance =
      await this.findParticipationsRequestService.execute(event_id, req.user);

    return res.status(201).json(instanceToPlain(participationInstance));
  }
}

export { FindParticipationsRequestController };
