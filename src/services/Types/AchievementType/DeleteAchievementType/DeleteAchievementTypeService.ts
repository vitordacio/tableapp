import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { IAchievementTypeRepository } from '@repositories/AchievementTypeRepository/IAchievementTypeRepository';

@injectable()
class DeleteAchievementTypeService {
  constructor(
    @inject('AchievementTypeRepository')
    private achievementTypeRepository: IAchievementTypeRepository,
  ) {}

  async execute(type_id: string): Promise<void> {
    const achievementType = await this.achievementTypeRepository.findById(
      type_id,
    );

    if (!achievementType) {
      throw new AppError('Tipo de conquista não encontrado.', 404);
    }

    await this.achievementTypeRepository.remove(achievementType);
  }
}

export { DeleteAchievementTypeService };
