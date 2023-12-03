import { inject, injectable } from 'tsyringe';
import { Event } from '@entities/Event/Event';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { AppError } from '@utils/AppError';
import { checkEventStatus } from '@utils/handleEvent';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { checkParticipationStatus } from '@utils/handleParticipation';

@injectable()
class FindEventByIdService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,
  ) {}

  async execute(
    event_id: string,
    user: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<Event> {
    const [event, participation] = await Promise.all([
      this.eventRepository.findById(event_id),
      this.participationRepository.findByUserAndEvent(user.id, event_id),
    ]);

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    event.participation_id = participation?.id_participation;
    event.status = checkEventStatus(event);

    event.participation_status = checkParticipationStatus({
      user_id: user.id,
      event,
      participation,
    });

    return event;
  }
}

export { FindEventByIdService };
