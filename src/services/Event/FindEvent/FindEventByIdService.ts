import { inject, injectable } from 'tsyringe';
import { Event } from '@entities/Event/Event';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { AppError } from '@utils/AppError';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { IReactRepository } from '@repositories/ReactRepository/IReactRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { handleEventControl } from '@utils/handleEvent';

@injectable()
class FindEventByIdService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('ReactRepository')
    private reactRepository: IReactRepository,
  ) {}

  async execute(
    event_id: string,
    reqUser: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<Event> {
    const [user, event, participation, react] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.eventRepository.findById(event_id),
      this.participationRepository.findByUserAndEvent(reqUser.id, event_id),
      this.reactRepository.findReactEvent(reqUser.id, event_id),
    ]);

    if (!user) {
      throw new AppError(
        'Token expirado, por favor realize login novamente.',
        400,
      );
    }

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    event.user_react = react;

    const eventControl = handleEventControl({
      event,
      user,
      participation,
    });

    event.event_status = eventControl.event_status;
    event.participation_id = eventControl.participation_id;
    event.participation_status = eventControl.participation_status;
    event.participating = eventControl.participating;
    event.can_see_content = eventControl.can_see_content;

    return event;
  }
}

export { FindEventByIdService };
