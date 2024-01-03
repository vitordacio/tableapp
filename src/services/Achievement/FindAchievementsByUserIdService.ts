import { inject, injectable } from 'tsyringe';
import { Achievement } from '@entities/Achievement/Achievement';
import { IAchievementRepository } from '@repositories/AchievementRepository/IAchievementRepository';
import { IFindByUserIdDTO } from './IFindAchievementsDTO';

@injectable()
class FindAchievementsByUserIdService {
  constructor(
    @inject('AchievementRepository')
    private achievementRepository: IAchievementRepository,
  ) {}

  async execute({
    user_id,
    limit,
    page,
  }: IFindByUserIdDTO): Promise<Achievement[]> {
    const achievements = await this.achievementRepository.findByUserId(
      user_id,
      page || 1,
      limit || 20,
    );

    return achievements;
  }
}

export { FindAchievementsByUserIdService };
