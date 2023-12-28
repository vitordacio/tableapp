import { inject, injectable } from 'tsyringe';

import { Event } from '@entities/Event/Event';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { generateEventControl } from '@utils/handleControl';
import { AppError } from '@utils/AppError';
import { IFindByUserIdDTO } from './IFindEventsServiceDTO';

@injectable()
class FindEventsByUserIdService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,
  ) {}

  async execute({
    user_id,
    page,
    limit,
    reqUser,
  }: IFindByUserIdDTO): Promise<Event[]> {
    const [requester, user, events] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.userRepository.findById(user_id),
      this.eventRepository.findByUserId(user_id, page || 1, limit || 20),
    ]);

    if (!requester) {
      throw new AppError('Token expirado, realize login novamente.', 403);
    }

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (events.length !== 0) {
      const event_ids = events.map(event => event.id_event);
      const userParticipations =
        await this.participationRepository.checkUserParticipations(
          requester.id_user,
          event_ids,
        );

      events.forEach(event => {
        const participation = userParticipations.find(
          userParticipation => userParticipation.event_id === event.id_event,
        );

        event.control = generateEventControl({
          event,
          participation,
          user: requester,
        });
      });
    }

    return events;
  }
}

export { FindEventsByUserIdService };
