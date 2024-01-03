import { getRepository, Repository } from 'typeorm';
import { IAchievementType } from '@entities/AchievementType/IAchievementType';
import { AchievementType } from '@entities/AchievementType/AchievementType';
import { IAchievementTypeRepository } from '../IAchievementTypeRepository';

class AchievementTypeRepository implements IAchievementTypeRepository {
  private ormRepository: Repository<AchievementType>;

  constructor() {
    this.ormRepository = getRepository(AchievementType);
  }

  create(data: IAchievementType): AchievementType {
    const achievementType = this.ormRepository.create({
      id_achievement_type: data.id,
      type: data.type,
      name: data.name.trim().toLowerCase(),
      category: data.category.trim().toLowerCase(),
      difficulty: data.difficulty,
      min_value: data.min_value,
    });

    return achievementType;
  }

  async save(entitie: AchievementType): Promise<AchievementType> {
    const newAchievementType = await this.ormRepository.save(entitie);

    return newAchievementType;
  }

  async findById(id: string): Promise<AchievementType | undefined> {
    const achievementType = await this.ormRepository.findOne({
      relations: ['achievements'],
      where: { id_achievement_type: id },
    });

    return achievementType;
  }

  async findIndex(): Promise<AchievementType[]> {
    const achievementTypes = await this.ormRepository.find();

    return achievementTypes;
  }

  async findDirectional(
    type: string,
    category: string,
    name: string,
    difficulty?: number,
  ): Promise<AchievementType | undefined> {
    const achievementType = await this.ormRepository.findOne({
      where: { type, category, name, difficulty: difficulty || 0 },
    });

    return achievementType;
  }

  async findManyDirectional(
    type: string,
    category: string,
    name: string,
  ): Promise<AchievementType[]> {
    const achievementType = await this.ormRepository.find({
      where: { type, category, name },
    });

    return achievementType;
  }

  async remove(entitie: AchievementType): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }

  async saveMany(entities: AchievementType[]): Promise<AchievementType[]> {
    const newTypes = await this.ormRepository.save(entities);

    return newTypes;
  }
}

export { AchievementTypeRepository };
