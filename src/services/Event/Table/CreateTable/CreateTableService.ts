import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { Event } from '@entities/Event/Event';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IEventTypeRepository } from '@repositories/EventTypeRepository/IEventTypeRepository';
import { ICreateTableDTO } from './CreateTableServiceDTO';

@injectable()
class CreateTableService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('EventTypeRepository')
    private eventTypeRepository: IEventTypeRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    name,
    location,
    time,
    additional,
    drink_preferences,
    age_limit,
    free_woman,
    free_man,
    user,
  }: ICreateTableDTO): Promise<Event> {
    const owner = await this.userRepository.findById(user.id);

    if (!owner) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const tableType = await this.eventTypeRepository.findByType('table');

    if (!tableType) {
      throw new AppError('Tipo não encontrado.', 404);
    }

    const table = this.eventRepository.create({
      id: v4(),
      type_id: tableType.id_event_type,
      name,
      location,
      time,
      additional,
      drink_preferences,
      age_limit,
      free_woman,
      free_man,
      owner_id: user.id,
    });

    await this.eventRepository.save(table);

    return table;
  }
}

export { CreateTableService };
