import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IEventTypeRepository } from '@repositories/EventTypeRepository/IEventTypeRepository';

@injectable()
class DeleteEventService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('EventTypeRepository')
    private eventTypeRepository: IEventTypeRepository,
  ) {}

  async execute(
    event_id: string,
    user: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<void> {
    const event = await this.eventRepository.findToRemove(event_id);

    if (!event || user.id !== event.author_id) {
      throw new AppError('Evento não encontrado.', 404);
    }

    const eventType = event.type;
    eventType.count -= 1;
    await this.eventTypeRepository.save(eventType);
    await this.eventRepository.remove(event);
  }
}

export { DeleteEventService };
