import { IAchievementType } from '@entities/AchievementType/IAchievementType';
import { AchievementType } from '@entities/AchievementType/AchievementType';

export interface IAchievementTypeRepository {
  create(data: IAchievementType): AchievementType;
  save(entitie: AchievementType): Promise<AchievementType>;
  findById(id: string): Promise<AchievementType | undefined>;
  findIndex(): Promise<AchievementType[]>;
  findDirectional(
    type: string,
    category: string,
    name: string,
    difficulty?: number,
  ): Promise<AchievementType | undefined>;
  findManyDirectional(
    type: string,
    category: string,
    name: string,
  ): Promise<AchievementType[]>;
  remove(entitie: AchievementType): Promise<void>;
  saveMany(entities: AchievementType[]): Promise<AchievementType[]>;
}
