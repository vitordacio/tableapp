import { inject, injectable } from 'tsyringe';

import { Event } from '@entities/Event/Event';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { checkEventStatus } from '@utils/handleEvent';
import { IFindEventsServiceDTO } from './IFindEventsServiceDTO';

@injectable()
class FindEventsByNameService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async execute({
    name,
    page,
    limit,
  }: IFindEventsServiceDTO): Promise<Event[]> {
    const events = await this.eventRepository.findByName(
      name || '',
      page || 1,
      limit || 20,
    );

    if (events.length !== 0) {
      events.forEach(event => {
        event.status = checkEventStatus(event);
      });
    }

    return events;
  }
}

export { FindEventsByNameService };
