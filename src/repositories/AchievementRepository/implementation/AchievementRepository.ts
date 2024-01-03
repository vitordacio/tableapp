import { getRepository, Repository } from 'typeorm';
import { IAchievement } from '@entities/Achievement/IAchievement';
import { Achievement } from '@entities/Achievement/Achievement';
import { IAchievementRepository } from '../IAchievementRepository';

class AchievementRepository implements IAchievementRepository {
  private ormRepository: Repository<Achievement>;

  constructor() {
    this.ormRepository = getRepository(Achievement);
  }

  create(data: IAchievement): Achievement {
    const achievement = this.ormRepository.create({
      id_achievement: data.id,
      type_id: data.type_id,
      user_id: data.user_id,
      event_id: data.event_id,
    });

    return achievement;
  }

  async save(achievement: Achievement): Promise<Achievement> {
    const newAchievement = await this.ormRepository.save(achievement);

    return newAchievement;
  }

  async findById(id: string): Promise<Achievement | undefined> {
    const achievement = await this.ormRepository.findOne({
      relations: ['type'],
      where: { id_achievement: id },
    });

    return achievement;
  }

  async findByUserId(user_id: string): Promise<Achievement | undefined> {
    const achievement = await this.ormRepository.findOne({
      relations: ['type'],
      where: { user_id },
      order: { created_at: 'DESC' },
    });

    return achievement;
  }

  async findByEventId(event_id: string): Promise<Achievement | undefined> {
    const achievement = await this.ormRepository.findOne({
      relations: ['type'],
      where: { event_id },
      order: { created_at: 'DESC' },
    });

    return achievement;
  }

  async findByUserIdCategoryName(
    user_id: string,
    category: string,
    name: string,
  ): Promise<Achievement[]> {
    const achievements = this.ormRepository
      .createQueryBuilder('achievement')
      .leftJoinAndSelect('achievement.type', 'type')
      .where(
        'achievement.user_id = :user_id AND type.type = :type AND type.category = :category AND type.name = :name',
        {
          user_id,
          type: 'user',
          category,
          name,
        },
      )

      .getMany();

    return achievements;
  }

  async findByEventIdCategoryName(
    event_id: string,
    category: string,
  ): Promise<Achievement[]> {
    const achievements = this.ormRepository
      .createQueryBuilder('achievement')
      .leftJoin('achievement.type', 'type')
      .where('achievement.type = :type AND achievement.event_id = :event_id', {
        type: 'event',
        event_id,
      })
      .andWhere('type.category = :category', { category })
      .orderBy('achievement.order', 'ASC')

      .getMany();

    return achievements;
  }

  async findByCategory(
    category: string,
    page: number,
    limit: number,
  ): Promise<Achievement[]> {
    const achievements = this.ormRepository
      .createQueryBuilder('achievement')
      .leftJoin('achievement.type', 'type')
      .where('type.category = :category', { category })
      .orderBy('achievement.order', 'ASC')
      .take(limit)
      .skip(page && limit ? limit * (page - 1) : undefined)
      .getMany();

    return achievements;
  }

  async remove(entitie: Achievement): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }

  async saveMany(entities: Achievement[]): Promise<Achievement[]> {
    const achievements = await this.ormRepository.save(entities);

    return achievements;
  }
}

export { AchievementRepository };
