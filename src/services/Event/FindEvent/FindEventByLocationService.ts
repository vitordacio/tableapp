import { inject, injectable } from 'tsyringe';

import { Event } from '@entities/Event/Event';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';

@injectable()
class FindEventByLocationService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async execute(lat: number, long: number): Promise<Event[]> {
    let events: Event[] = [];
    events = await this.eventRepository.findByCoordinates(lat, long);

    if (events.length === 0) {
      events = await this.eventRepository.findClosest(lat, long);
    }

    return events;
  }
}

export { FindEventByLocationService };
