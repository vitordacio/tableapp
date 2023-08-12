import { inject, injectable } from 'tsyringe';

import { Event } from '@entities/Event/Event';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';

@injectable()
class FindTableIndexService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async execute(): Promise<Event[]> {
    const tables = await this.eventRepository.findIndexByType('table');

    return tables;
  }
}

export { FindTableIndexService };
