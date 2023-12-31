import { inject, injectable } from 'tsyringe';
import { Event } from '@entities/Event/Event';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IFindByUserIdDTO } from './IFindEventsServiceDTO';

@injectable()
class FindEventsByUserIdService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async execute({ user_id, page, limit }: IFindByUserIdDTO): Promise<Event[]> {
    const events = await this.eventRepository.findByUserId(
      user_id,
      page || 1,
      limit || 20,
    );
    return events;
  }
}

export { FindEventsByUserIdService };
