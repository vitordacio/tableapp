import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import achievementType from '@config/fetch/achievementType';
import { AchievementType } from '@entities/AchievementType/AchievementType';
import { IAchievementTypeRepository } from '@repositories/AchievementTypeRepository/IAchievementTypeRepository';

@injectable()
class FetchAchievementTypesService {
  constructor(
    @inject('AchievementTypeRepository')
    private achievementTypeRepository: IAchievementTypeRepository,
  ) {}

  async execute(): Promise<AchievementType[]> {
    const newTypes: AchievementType[] = [];

    const types = await this.achievementTypeRepository.findIndex();

    achievementType.forEach(data => {
      const alreadyExists = types.some(
        type =>
          type.type === data.category &&
          type.category === data.category &&
          type.name === data.name &&
          type.difficulty === (data.difficulty || 0),
      );

      if (alreadyExists) return;

      const newType = this.achievementTypeRepository.create({
        id: v4(),
        type: data.type,
        category: data.category,
        name: data.name,
        difficulty: data.difficulty,
      });

      newTypes.push(newType);
    });

    await this.achievementTypeRepository.saveMany(newTypes);

    return newTypes;
  }
}

export { FetchAchievementTypesService };
