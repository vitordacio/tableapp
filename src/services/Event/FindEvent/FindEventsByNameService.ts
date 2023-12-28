import { inject, injectable } from 'tsyringe';
import { Event } from '@entities/Event/Event';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { generateEventControl } from '@utils/handleControl';
import { AppError } from '@utils/AppError';
import { IFindEventsServiceDTO } from './IFindEventsServiceDTO';

@injectable()
class FindEventsByNameService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,
  ) {}

  async execute({
    name,
    page,
    limit,
    reqUser,
  }: IFindEventsServiceDTO): Promise<Event[]> {
    const [user, events] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.eventRepository.findByName(name || '', page || 1, limit || 20),
    ]);

    if (!user) {
      throw new AppError('Token expirado, realize login novamente.', 403);
    }

    if (events.length !== 0) {
      const event_ids = events.map(event => event.id_event);
      const userParticipations =
        await this.participationRepository.checkUserParticipations(
          user.id_user,
          event_ids,
        );

      events.forEach(event => {
        const participation = userParticipations.find(
          userParticipation => userParticipation.event_id === event.id_event,
        );

        event.control = generateEventControl({
          event,
          participation,
          user,
        });
      });
    }

    return events;
  }
}

export { FindEventsByNameService };
