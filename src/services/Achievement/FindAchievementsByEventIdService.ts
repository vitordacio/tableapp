import { inject, injectable } from 'tsyringe';
import { Achievement } from '@entities/Achievement/Achievement';
import { IAchievementRepository } from '@repositories/AchievementRepository/IAchievementRepository';
import { IFindByEventIdDTO } from './IFindAchievementsDTO';

@injectable()
class FindAchievementsByEventIdService {
  constructor(
    @inject('AchievementRepository')
    private achievementRepository: IAchievementRepository,
  ) {}

  async execute({
    event_id,
    limit,
    page,
  }: IFindByEventIdDTO): Promise<Achievement[]> {
    const achievements = await this.achievementRepository.findByEventId(
      event_id,
      page || 1,
      limit || 20,
    );

    return achievements;
  }
}

export { FindAchievementsByEventIdService };
