import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { Event } from '@entities/Event/Event';
import { IUpdateEventHoursDTO } from './UpdateEventDTO';

@injectable()
class UpdateEventHoursService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,
  ) {}

  async execute({
    user,
    event_id,
    start_time,
    finish_time,
  }: IUpdateEventHoursDTO): Promise<Event> {
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

    if (start_time && finish_time && start_time > finish_time) {
      throw new AppError(
        'Horário inicial deve ser menor que horário final.',
        400,
      );
    }

    const finishTime = new Date();
    finishTime.setHours(new Date().getHours() + 24);

    event.start_time = start_time;
    event.finish_time = finish_time || finishTime;

    await this.eventRepository.save(event);

    return event;
  }
}

export { UpdateEventHoursService };
