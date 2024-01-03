import { IAchievement } from '@entities/Achievement/IAchievement';
import { Achievement } from '@entities/Achievement/Achievement';

export interface IAchievementRepository {
  save(entitie: Achievement): Promise<Achievement>;
  create(data: IAchievement): Achievement;
  findById(id: string): Promise<Achievement | undefined>;
  findByUserId(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<Achievement[]>;
  findByEventId(
    event_id: string,
    page: number,
    limit: number,
  ): Promise<Achievement[]>;
  findByEventIdCategoryName(
    event_id: string,
    category: string,
    name: string,
  ): Promise<Achievement[]>;
  findByUserIdCategoryName(
    user_id: string,
    category: string,
    name: string,
  ): Promise<Achievement[]>;
  findByCategory(
    category: string,
    page: number,
    limit: number,
  ): Promise<Achievement[]>;
  saveMany(entities: Achievement[]): Promise<Achievement[]>;
  remove(entitie: Achievement): Promise<void>;
}
