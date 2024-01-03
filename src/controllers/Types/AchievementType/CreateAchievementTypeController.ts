import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { CreateAchievementTypeService } from '@services/Types/AchievementType/CreateAchievementType/CreateAchievementTypeService';

class CreateAchievementTypeController {
  private createAchievementTypeService: CreateAchievementTypeService;

  constructor() {
    this.createAchievementTypeService = container.resolve(
      CreateAchievementTypeService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { type, name, category, difficulty } = req.body;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const achievementTypeInstance =
      await this.createAchievementTypeService.execute({
        type,
        name,
        category,
        difficulty,
      });

    return res.status(201).json(instanceToPlain(achievementTypeInstance));
  }
}

export { CreateAchievementTypeController };
