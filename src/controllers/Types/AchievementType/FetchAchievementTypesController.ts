import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { FetchAchievementTypesService } from '@services/Types/AchievementType/FetchAchievementTypes/FetchAchievementTypesService';

class FetchAchievementTypesController {
  private fetchAchievementTypesService: FetchAchievementTypesService;

  constructor() {
    this.fetchAchievementTypesService = container.resolve(
      FetchAchievementTypesService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const achievementTypeInstance =
      await this.fetchAchievementTypesService.execute();

    return res.status(201).json(instanceToPlain(achievementTypeInstance));
  }
}

export { FetchAchievementTypesController };
