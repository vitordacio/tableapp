import { inject, injectable } from 'tsyringe';

import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { Participation } from '@entities/Participation/Participation';
import { AppError } from '@utils/AppError';
import { hasModPermission } from '@utils/validations';

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
      const auth = hasModPermission(user.id, event.participations);

      if (!auth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    let participations = await this.participationRepository.findByEventId(
      event_id,
    );
    const reviwed: Participation[] = [];
    const noReviwed: Participation[] = [];

    participations.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    );

    participations.map(participation => {
      if (!participation.reviwed_by_event) return noReviwed.push(participation);
      return reviwed.push(participation);
    });

    participations = [...noReviwed, ...reviwed];

    return participations;
  }
}

export { FindParticipationsRequestService };
