import { inject, injectable } from 'tsyringe';

import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { Participation } from '@entities/Participation/Participation';
import { AppError } from '@utils/AppError';

@injectable()
class FindParticipationsRequestService {
  constructor(
    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('EventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async execute(
    event_id: string,
    user: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<Participation[]> {
    const event = await this.eventRepository.findById(event_id);

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    if (user.id !== event.author_id) {
      const hasAuth = await this.participationRepository.checkMod(
        user.id,
        event.id_event,
      );

      if (!hasAuth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    const participations = await this.participationRepository.findByEventId(
      event_id,
    );

    return participations;
  }
}

export { FindParticipationsRequestService };
