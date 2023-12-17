import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindRequestsReviwedService } from '@services/Participation/FindParticipation/FindRequestsReviwedService';

class FindRequestsReviwedController {
  private findRequestsReviwedService: FindRequestsReviwedService;

  constructor() {
    this.findRequestsReviwedService = container.resolve(
      FindRequestsReviwedService,
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

    const participationInstance = await this.findRequestsReviwedService.execute(
      {
        event_id,
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
        user: req.user,
      },
    );

    return res.status(201).json(instanceToPlain(participationInstance));
  }
}

export { FindRequestsReviwedController };
