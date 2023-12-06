import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { Event } from '@entities/Event/Event';
import { IUpdateEventPerformerDTO } from './UpdateEventDTO';

@injectable()
class UpdateEventPerformerService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,
  ) {}

  async execute({
    user,
    event_id,
    performer,
  }: IUpdateEventPerformerDTO): Promise<Event> {
    const event = await this.eventRepository.findById(event_id);

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    if (user.id !== event.author_id) {
      const auth = await this.participationRepository.checkMod(
        user.id,
        event_id,
      );

      if (!auth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    event.performer = performer;

    await this.eventRepository.save(event);

    return event;
  }
}

export { UpdateEventPerformerService };
