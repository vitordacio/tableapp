import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { FindAchievementTypesService } from '@services/Types/AchievementType/FindAchievementTypes/FindAchievementTypesService';

class FindAchievementTypesController {
  private findAchievementTypesService: FindAchievementTypesService;

  constructor() {
    this.findAchievementTypesService = container.resolve(
      FindAchievementTypesService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const achievementTypeInstance =
      await this.findAchievementTypesService.execute();

    return res.status(200).json(instanceToPlain(achievementTypeInstance));
  }
}

export { FindAchievementTypesController };
