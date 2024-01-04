import { inject, injectable } from 'tsyringe';
import { Achievement } from '@entities/Achievement/Achievement';
import { IAchievementRepository } from '@repositories/AchievementRepository/IAchievementRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { AppError } from '@utils/AppError';
import { IFindByEventIdDTO } from './IFindAchievementsDTO';

@injectable()
class FindAchievementsByEventIdService {
  constructor(
    @inject('AchievementRepository')
    private achievementRepository: IAchievementRepository,

    @inject('EventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async execute({
    event_id,
    limit,
    page,
  }: IFindByEventIdDTO): Promise<Achievement[]> {
    const [event, achievements] = await Promise.all([
      this.eventRepository.findById(event_id),
      this.achievementRepository.findByEventId(
        event_id,
        page || 1,
        limit || 20,
      ),
    ]);

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    return achievements;
  }
}

export { FindAchievementsByEventIdService };
