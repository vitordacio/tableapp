import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Event } from '@entities/Event/Event';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { extractTagsFromText } from '@utils/generateTags';
import { ICreateEventDTO } from './CreateEventServiceDTO';

dayjs.extend(utc);

@injectable()
class CreateEventService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
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
  }: ICreateEventDTO): Promise<Event> {
    const author = await this.userRepository.findById(user.id);

    if (!author) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    // if (author.role_name === 'user' && type !== 'table') {
    //   throw new AppError('Não autorizado.', 403);
    // }

    const formatedDate = dayjs.utc();

    const event = this.eventRepository.create({
      id: v4(),
      author_id: author.id_user,
      type_id: '',
      name,
      location,
      date: date || formatedDate.format('YYYY-MM-DD'),
      time: time || formatedDate.format('HH:mm'),
      finish_date:
        finish_date || formatedDate.add(24, 'hour').format('YYYY-MM-DD'),
      finish_time: finish_time || formatedDate.add(24, 'hour').format('HH:mm'),
      additional,
      drink_preferences,
      ticket_value,
      tickets_free,
      min_amount,
      private: is_private,
      club_name,
      performer,
      tags: extractTagsFromText(
        `${name} ${location} ${author.name} ${author.username}`,
      ),
    });

    event.participations = [];

    await this.eventRepository.save(event);

    return event;
  }
}

export { CreateEventService };
