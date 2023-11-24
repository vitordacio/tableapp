import { inject, injectable } from 'tsyringe';
import { EventType } from '@entities/EventType/EventType';
import { IEventTypeRepository } from '@repositories/EventTypeRepository/IEventTypeRepository';

@injectable()
class FindEventTypesService {
  constructor(
    @inject('EventTypeRepository')
    private eventTypeRepository: IEventTypeRepository,
  ) {}

  async execute(): Promise<EventType[]> {
    const types = await this.eventTypeRepository.findIndex();

    return types;
  }
}

export { FindEventTypesService };
