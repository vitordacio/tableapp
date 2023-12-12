import { inject, injectable } from 'tsyringe';

import { Event } from '@entities/Event/Event';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { checkEventStatus } from '@utils/handleEvent';
import { AppError } from '@utils/AppError';
import { IFindByUserIdDTO } from './IFindEventsServiceDTO';

@injectable()
class FindEventsByUserIdService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ user_id, page, limit }: IFindByUserIdDTO): Promise<Event[]> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const events = await this.eventRepository.findByUserId(
      user.id_user,
      page || 1,
      limit || 20,
    );

    if (events.length !== 0) {
      events.forEach(event => {
        event.status = checkEventStatus(event);
      });
    }

    return events;
  }
}

export { FindEventsByUserIdService };
