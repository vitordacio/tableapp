import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { hasModPermission } from '@utils/validations';
import { IUpdateEventDTO } from './UpdateEventDTO';

@injectable()
class UpdateEventService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async execute({
    user,
    event_id,
    name,
    location,
    date,
    time,
    finish_date,
    finish_time,
    club_name,
    performer,
    additional,
    drink_preferences,
    age_limit,
    free_ticket,
  }: IUpdateEventDTO): Promise<void> {
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

    event.name = name;
    event.location = location;
    event.date = date;
    event.time = time;
    event.finish_date = finish_date;
    event.finish_time = finish_time;
    event.club_name = club_name as string;
    event.performer = performer as string;
    event.additional = additional as string;
    event.drink_preferences = drink_preferences as string;
    event.age_limit = age_limit as number;
    event.free_ticket = free_ticket as number;

    await this.eventRepository.save(event);
  }
}

export { UpdateEventService };
