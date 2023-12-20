import { inject, injectable } from 'tsyringe';

import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

import { AppError } from '@utils/AppError';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';

@injectable()
class DeleteParticipationService {
  constructor(
    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('EventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async execute(
    participation_id: string,
    user: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<void> {
    const participation = await this.participationRepository.findToRemove(
      participation_id,
    );

    if (!participation) {
      throw new AppError('Participação não encontrada.', 404);
    }

    if (
      participation.user_id !== user.id &&
      participation.event.author_id !== user.id
    ) {
      const hasAuth = await this.participationRepository.checkMod(
        user.id,
        participation.event.id_event,
      );

      if (!hasAuth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    await this.participationRepository.remove(participation);

    if (participation.in) {
      participation.event.participating_count -= 1;
      await this.eventRepository.save(participation.event);
    }
  }
}

export { DeleteParticipationService };
