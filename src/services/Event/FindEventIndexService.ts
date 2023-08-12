import { inject, injectable } from 'tsyringe';

import { Event } from '@entities/Event/Event';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';

@injectable()
class FindEventIndexService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async execute(): Promise<Event[]> {
    const events = await this.eventRepository.findIndex();

    return events;
  }
}

export { FindEventIndexService };
