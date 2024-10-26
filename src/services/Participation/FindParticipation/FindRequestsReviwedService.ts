import { inject, injectable } from 'tsyringe';

import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { Participation } from '@entities/Participation/Participation';
import { AppError } from '@utils/AppError';
import { checkParticipationStatus } from '@utils/handleParticipation';
import { IFindRequestsDTO } from './IFindParticipationsDTO';

@injectable()
class FindRequestsReviwedService {
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
    reqUser,
  }: IFindRequestsDTO): Promise<Participation[]> {
    const [event, participations] = await Promise.all([
      this.eventRepository.findById(event_id),
      this.participationRepository.findRequestsReviwed(
        event_id,
        page || 1,
        limit || 20,
      ),
    ]);

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    if (reqUser.id !== event.author_id) {
      const hasAuth = await this.participationRepository.checkMod(
        reqUser.id,
        event.id_event,
      );

      if (!hasAuth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    const formatedParticipations: Participation[] = [];

    if (participations.length !== 0) {
      participations.forEach(participation => {
        const { user: participationUser } = participation;

        const participation_status = checkParticipationStatus({
          event,
          user: participationUser,
          participation,
        });

        const participating = [
          'author',
          'user_in',
          'guest_in',
          'mod_in',
          'vip_in',
        ].includes(participation_status);

        formatedParticipations.push({
          ...participation,
          participation_status,
          participating,
        });
      });
    }

    return formatedParticipations;
  }
}

export { FindRequestsReviwedService };
