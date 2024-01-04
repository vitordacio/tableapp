import { inject, injectable } from 'tsyringe';
import { Participation } from '@entities/Participation/Participation';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { AppError } from '@utils/AppError';
import { IFindByEventIdDTO } from './IFindParticipationsDTO';

@injectable()
class FindParticipationsByEventIdService {
  constructor(
    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('EventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async execute({
    event_id,
    limit,
    page,
  }: IFindByEventIdDTO): Promise<Participation[]> {
    const [event, participations] = await Promise.all([
      this.eventRepository.findById(event_id),
      this.participationRepository.findByEventId(
        event_id,
        page || 1,
        limit || 20,
      ),
    ]);

    if (!event) {
      throw new AppError('Evento não encontrado', 404);
    }

    return participations;
  }
}

export { FindParticipationsByEventIdService };
