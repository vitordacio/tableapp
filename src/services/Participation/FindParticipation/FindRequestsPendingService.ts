import { inject, injectable } from 'tsyringe';

import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { Participation } from '@entities/Participation/Participation';
import { AppError } from '@utils/AppError';
import { IFindRequestsDTO } from './IFindParticipationsDTO';

@injectable()
class FindRequestsPendingService {
  constructor(
    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('EventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async execute({
    event_id,
    page,
    limit,
    user,
  }: IFindRequestsDTO): Promise<Participation[]> {
    let participations: Participation[] = [];
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

    participations = await this.participationRepository.findRequestsPending(
      event.id_event,
      page || 1,
      limit || 20,
    );

    if (participations.length !== 0) {
      participations.map(participation => ({
        ...participation,
        participation_status: 'user_out',
      }));
    }

    return participations;
  }
}

export { FindRequestsPendingService };
