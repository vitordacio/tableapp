import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { hasModPermission } from '@utils/validations';
import { Event } from '@entities/Event/Event';
import { IUpdateEventActivedDTO } from './UpdateEventDTO';

@injectable()
class UpdateEventActivedService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async execute({
    user,
    event_id,
    actived,
  }: IUpdateEventActivedDTO): Promise<Event> {
    const event = await this.eventRepository.findById(event_id);

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    if (user.id !== event.owner_id) {
      const auth = hasModPermission(user.id, event.participations);

      if (!auth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    event.actived = actived;

    await this.eventRepository.save(event);

    return event;
  }
}

export { UpdateEventActivedService };
