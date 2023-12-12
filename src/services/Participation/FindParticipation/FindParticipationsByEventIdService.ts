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
    const event = await this.eventRepository.findById(event_id);

    if (!event) {
      throw new AppError('Evento não encontrado', 404);
    }

    const participation = await this.participationRepository.findByEventId(
      event.id_event,
      page || 1,
      limit || 20,
    );

    return participation;
  }
}

export { FindParticipationsByEventIdService };
