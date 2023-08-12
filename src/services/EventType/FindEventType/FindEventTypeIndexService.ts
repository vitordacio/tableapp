import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { IEventTypeRepository } from '@repositories/EventTypeRepository/IEventTypeRepository';
import { EventType } from '@entities/EventType/EventType';

@injectable()
class FindEventTypeIndexService {
  constructor(
    @inject('EventTypeRepository')
    private eventTypeRepository: IEventTypeRepository,
  ) {}

  async execute(): Promise<EventType[]> {
    const eventTypes = await this.eventTypeRepository.findIndex();

    if (!eventTypes) {
      throw new AppError('Evento não encontrado.', 404);
    }

    return eventTypes;
  }
}

export { FindEventTypeIndexService };
