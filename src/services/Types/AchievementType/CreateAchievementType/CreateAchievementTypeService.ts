import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { AchievementType } from '@entities/AchievementType/AchievementType';
import { AppError } from '@utils/AppError';
import { IAchievementTypeRepository } from '@repositories/AchievementTypeRepository/IAchievementTypeRepository';
import { ICreateAchievementTypeDTO } from './ICreateAchievementTypeServiceDTO';

@injectable()
class CreateAchievementTypeService {
  constructor(
    @inject('AchievementTypeRepository')
    private achievementTypeRepository: IAchievementTypeRepository,
  ) {}

  async execute({
    type,
    category,
    name,
    difficulty,
  }: ICreateAchievementTypeDTO): Promise<AchievementType> {
    const alreadyExists = await this.achievementTypeRepository.findDirectional(
      type,
      category,
      name,
      difficulty,
    );

    if (alreadyExists) {
      throw new AppError('Tipo de conquista já cadastrado.', 400);
    }

    const achievementType = this.achievementTypeRepository.create({
      id: v4(),
      type,
      category,
      name,
      difficulty,
    });

    await this.achievementTypeRepository.save(achievementType);

    return achievementType;
  }
}

export { CreateAchievementTypeService };
