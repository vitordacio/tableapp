import { inject, injectable } from 'tsyringe';
import { Event } from '@entities/Event/Event';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { AppError } from '@utils/AppError';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { generateEventControl } from '@utils/handleControl';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';

@injectable()
class FindEventByIdService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(
    event_id: string,
    reqUser: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<Event> {
    const [user, event, participation] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.eventRepository.findById(event_id),
      this.participationRepository.findByUserAndEvent(reqUser.id, event_id),
    ]);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    event.control = generateEventControl({
      event,
      participation,
      user,
    });

    return event;
  }
}

export { FindEventByIdService };
