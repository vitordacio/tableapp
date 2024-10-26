import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindRequestsPendingService } from '@services/Participation/FindParticipation/FindRequestsPendingService';

class FindRequestsPendingController {
  private findRequestsPendingService: FindRequestsPendingService;

  constructor() {
    this.findRequestsPendingService = container.resolve(
      FindRequestsPendingService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id } = req.params;
    const { page, limit } = req.query;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const participationInstance = await this.findRequestsPendingService.execute(
      {
        event_id,
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
        reqUser: req.user,
      },
    );

    return res.status(201).json(instanceToPlain(participationInstance));
  }
}

export { FindRequestsPendingController };
