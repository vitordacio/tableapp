import { inject, injectable } from 'tsyringe';
import { Event } from '@entities/Event/Event';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IBlockRepository } from '@repositories/BlockRepository/IBlockRepository';
import { checkEventStatus } from '@utils/handleEvent';
import { IFindEventsServiceDTO } from './IFindEventsServiceDTO';

@injectable()
class FindEventsByNameService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('BlockRepository')
    private blockRepository: IBlockRepository,
  ) {}

  async execute({
    name,
    page,
    limit,
    reqUser,
  }: IFindEventsServiceDTO): Promise<Event[]> {
    let events = await this.eventRepository.findByName(
      name || '',
      page || 1,
      limit || 20,
    );

    if (events.length !== 0) {
      const user_ids = events.map(event => event.author_id);
      let blocked_ids: string[];
      const userBlocks = await this.blockRepository.checkBlocks(
        reqUser.id,
        user_ids,
      );

      if (userBlocks.length !== 0)
        blocked_ids = userBlocks.map(block => block.author_id);

      const filtered: Event[] = [];

      events.forEach(event => {
        if (blocked_ids && blocked_ids.includes(event.author_id)) return null;

        return filtered.push({
          ...event,
          event_status: checkEventStatus(event),
        });
      });

      events = [...filtered];
    }

    return events;
  }
}

export { FindEventsByNameService };
