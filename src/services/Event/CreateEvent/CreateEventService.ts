import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Event } from '@entities/Event/Event';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { extractTagsFromText } from '@utils/generateTags';
import { IEventTypeRepository } from '@repositories/EventTypeRepository/IEventTypeRepository';
import { ICreateEventDTO } from './ICreateEventServiceDTO';

dayjs.extend(utc);

@injectable()
class CreateEventService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('EventTypeRepository')
    private eventTypeRepository: IEventTypeRepository,
  ) {}

  async execute({
    type_id,
    user,
    name,
    location,
    start_time,
    finish_time,
    additional,
    drink_preferences,
    ticket_value,
    tickets_free,
    min_amount,
    is_private,
    club_name,
    performer,
    address_id,
  }: ICreateEventDTO): Promise<Event> {
    if (name.length < 4) {
      throw new AppError('Nome precisa ter ao menos 4 dígitos.', 400);
    }

    const [author, type] = await Promise.all([
      this.userRepository.findById(user.id),
      this.eventTypeRepository.findById(type_id),
    ]);

    // const author = await this.userRepository.findById(user.id);

    if (!author) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    // const type = await this.eventTypeRepository.findById(type_id);

    if (!type) {
      throw new AppError('Tipo de evento não encontrado.', 404);
    }

    if (author.role_name === 'user' && type.verified) {
      throw new AppError('Não autorizado.', 403);
    }

    const currentTime = new Date();
    const finishTime = new Date(currentTime);
    finishTime.setHours(currentTime.getHours() + 24);

    const event = this.eventRepository.create({
      id: v4(),
      author_id: author.id_user,
      type_id,
      name,
      location,
      start_time: start_time || currentTime,
      finish_time: finish_time || finishTime,
      additional,
      drink_preferences,
      ticket_value: ticket_value || undefined,
      tickets_free: tickets_free || undefined,
      min_amount: min_amount || undefined,
      private: is_private,
      club_name,
      performer,
      address_id: address_id || undefined,
      tags: extractTagsFromText(
        `${name} ${location} ${author.name} ${author.username}`,
      ),
    });

    event.participations = [];
    type.count += 1;

    await Promise.all([
      await this.eventRepository.save(event),
      await this.eventTypeRepository.save(type),
    ]);

    // await this.eventRepository.save(event);
    // type.count += 1;
    // await this.eventTypeRepository.save(type);

    return event;
  }
}

export { CreateEventService };
