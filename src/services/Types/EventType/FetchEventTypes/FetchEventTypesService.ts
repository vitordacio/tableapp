import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { EventType } from '@entities/EventType/EventType';
import eventType from '@config/fetch/eventType';
import { IEventTypeRepository } from '@repositories/EventTypeRepository/IEventTypeRepository';

@injectable()
class FetchEventTypesService {
  constructor(
    @inject('EventTypeRepository')
    private eventTypeRepository: IEventTypeRepository,
  ) {}

  async execute(): Promise<EventType[]> {
    const newTypes: EventType[] = [];

    const types = await this.eventTypeRepository.findIndex();

    eventType.forEach(data => {
      const alreadyExists = types.some(type => type.name === data.name);

      if (alreadyExists) return;

      const newType = this.eventTypeRepository.create({
        id: v4(),
        name: data.name,
        order: data.order,
      });

      if (data.verified) newType.verified = data.verified;

      newTypes.push(newType);
    });

    await this.eventTypeRepository.saveMany(newTypes);

    return newTypes;
  }
}

export { FetchEventTypesService };
