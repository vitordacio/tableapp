import { inject, injectable } from 'tsyringe';
import { Event } from '@entities/Event/Event';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { checkEventStatus } from '@utils/handleEvent';
import { AppError } from '@utils/AppError';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
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
    const [user, data] = await Promise.all([
      this.userRepository.findById(user_id),
      this.eventRepository.findByUserId(user_id, page || 1, limit || 20),
    ]);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    let events: Event[] = [];

    if (data.length !== 0) {
      events = data.map(event => {
        return {
          ...event,
          event_status: checkEventStatus(event),
        };
      });
    }

    return events;
  }
}

export { FindEventsByUserIdService };
