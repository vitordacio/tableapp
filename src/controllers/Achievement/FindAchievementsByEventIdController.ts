import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindAchievementsByEventIdService } from '@services/Achievement/FindAchievementsByEventIdService';

class FindAchievementsByEventIdController {
  private findAchievementsByEventIdService: FindAchievementsByEventIdService;

  constructor() {
    this.findAchievementsByEventIdService = container.resolve(
      FindAchievementsByEventIdService,
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

    const achievementInstance =
      await this.findAchievementsByEventIdService.execute({
        event_id,
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
      });

    return res.status(200).json(instanceToPlain(achievementInstance));
  }
}

export { FindAchievementsByEventIdController };
