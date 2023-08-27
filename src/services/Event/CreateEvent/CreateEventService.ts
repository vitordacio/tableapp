import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Event } from '@entities/Event/Event';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
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
    type,
    name,
    location,
    date,
    time,
    finish_date,
    finish_time,
    img_url,
    club_name,
    performer,
    additional,
    drink_preferences,
    age_limit,
    free_ticket,
    is_private,
  }: ICreateEventDTO): Promise<Event> {
    const owner = await this.userRepository.findById(user.id);

    if (!owner) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    if (user.role === 'user' && type !== 'table') {
      throw new AppError('Não autorizado.', 403);
    }

    const formatedDate = dayjs.utc();

    const event = this.eventRepository.create({
      id: v4(),
      owner,
      type,
      name,
      location,
      date: date || formatedDate.format('YYYY-MM-DD'),
      time: time || formatedDate.format('HH:mm'),
      finish_date:
        finish_date || formatedDate.add(12, 'hour').format('YYYY-MM-DD'),
      finish_time: finish_time || formatedDate.add(12, 'hour').format('HH:mm'),
      img_url,
      club_name,
      performer,
      additional,
      drink_preferences,
      age_limit,
      free_ticket,
      private: is_private,
    });

    event.participations = [];

    await this.eventRepository.save(event);

    return event;
  }
}

export { CreateEventService };
