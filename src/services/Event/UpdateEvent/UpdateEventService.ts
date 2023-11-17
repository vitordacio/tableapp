import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { hasModPermission } from '@utils/validations';
import { Event } from '@entities/Event/Event';
import { extractTagsFromText } from '@utils/generateTags';
import { IUpdateEventDTO } from './UpdateEventDTO';

@injectable()
class UpdateEventService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async execute({
    event_id,
    user,
    name,
    location,
    date,
    time,
    finish_date,
    finish_time,
    additional,
    drink_preferences,
    ticket_value,
    tickets_free,
    min_amount,
    is_private,
    club_name,
    performer,
  }: IUpdateEventDTO): Promise<Event> {
    const event = await this.eventRepository.findById(event_id);

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    if (user.id !== event.author_id) {
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
    event.club_name = club_name as string;
    event.performer = performer as string;
    event.drink_preferences = drink_preferences as string;
    event.ticket_value = ticket_value || 0;
    event.tickets_free = tickets_free || 0;
    event.min_amount = min_amount || 0;
    event.private = is_private as boolean;
    event.tags = extractTagsFromText(
      `${event.name} ${event.location} ${event.author.name} ${event.author.username}`,
    ) as unknown as string;

    await this.eventRepository.save(event);

    return event;
  }
}

export { UpdateEventService };
