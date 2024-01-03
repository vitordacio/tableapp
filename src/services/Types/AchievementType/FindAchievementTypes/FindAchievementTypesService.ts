import { inject, injectable } from 'tsyringe';
import { AchievementType } from '@entities/AchievementType/AchievementType';
import { IAchievementTypeRepository } from '@repositories/AchievementTypeRepository/IAchievementTypeRepository';

@injectable()
class FindAchievementTypesService {
  constructor(
    @inject('AchievementTypeRepository')
    private achievementTypeRepository: IAchievementTypeRepository,
  ) {}

  async execute(): Promise<AchievementType[]> {
    const types = await this.achievementTypeRepository.findIndex();

    return types;
  }
}

export { FindAchievementTypesService };
