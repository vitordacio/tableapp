import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { hasModPermission } from '@utils/validations';
import { Event } from '@entities/Event/Event';
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
    additional,
    drink_preferences,
    age_limit,
    free_ticket,
    is_private,
    club_name,
    performer,
  }: IUpdateEventDTO): Promise<Event> {
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

    if (date && time && finish_date && finish_time) {
      const difference =
        new Date(`${date}T${time}`).getTime() -
        new Date(`${finish_date}T${finish_time}`).getTime();
      if (difference > 0) {
        throw new AppError('Data inicial deve ser menor que a final.', 403);
      }
    }

    event.name = name;
    event.location = location;
    if (date) event.date = date as unknown as Date;
    if (time) event.time = time as unknown as Date;
    if (finish_date) event.finish_date = finish_date as unknown as Date;
    if (finish_time) event.finish_time = finish_time as unknown as Date;
    event.additional = additional as string;
    event.drink_preferences = drink_preferences as string;
    event.age_limit = age_limit || 0;
    event.free_ticket = free_ticket || 0;
    event.private = is_private as boolean;
    if (event.type !== 'table') event.club_name = club_name as string;
    if (event.type !== 'table') event.performer = performer as string;

    await this.eventRepository.save(event);

    return event;
  }
}

export { UpdateEventService };
