import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { DeleteAchievementTypeService } from '@services/Types/AchievementType/DeleteAchievementType/DeleteAchievementTypeService';

class DeleteAchievementTypeController {
  private deleteAchievementTypeService: DeleteAchievementTypeService;

  constructor() {
    this.deleteAchievementTypeService = container.resolve(
      DeleteAchievementTypeService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const achievementTypeInstance =
      await this.deleteAchievementTypeService.execute(id);

    return res.status(201).json(instanceToPlain(achievementTypeInstance));
  }
}

export { DeleteAchievementTypeController };
