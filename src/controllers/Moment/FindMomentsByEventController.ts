import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { FindMomentsByEventService } from '@services/Moment/FindMomentsByEvent/FindMomentsByEventService';

class FindMomentsByEventController {
  private findMomentsByEventService: FindMomentsByEventService;

  constructor() {
    this.findMomentsByEventService = container.resolve(
      FindMomentsByEventService,
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

    const momentInstance = await this.findMomentsByEventService.execute({
      event_id,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
    });

    return res.status(200).json(instanceToPlain(momentInstance));
  }
}

export { FindMomentsByEventController };
