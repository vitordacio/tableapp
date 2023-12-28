import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { EventType } from '@entities/EventType/EventType';
import { IEventTypeRepository } from '@repositories/EventTypeRepository/IEventTypeRepository';

@injectable()
class FetchEventTypesService {
  constructor(
    @inject('EventTypeRepository')
    private eventTypeRepository: IEventTypeRepository,
  ) {}

  async execute(): Promise<EventType[]> {
    const fetchData = [
      {
        name: 'party',
        verified: true,
      },
      {
        name: 'table',
      },
      {
        name: 'exercise',
      },
      {
        name: 'culinary',
      },
      {
        name: 'birthday',
      },
      {
        name: 'meeting',
      },
      {
        name: 'moon',
      },
      {
        name: 'auditorium',
      },
      {
        name: 'fishing',
      },
      {
        name: 'games',
      },
      {
        name: 'beach',
      },
      {
        name: 'nature',
      },
      {
        name: 'boat',
      },
      {
        name: 'pool',
      },
    ];

    const newTypes: EventType[] = [];

    const types = await this.eventTypeRepository.findIndex();

    fetchData.forEach(data => {
      const alreadyExists = types.some(type => type.name === data.name);

      if (alreadyExists) return;

      const newType = this.eventTypeRepository.create({
        id: v4(),
        name: data.name,
      });

      if (data.verified) newType.verified = data.verified;

      newTypes.push(newType);
    });

    await this.eventTypeRepository.saveMany(newTypes);

    return newTypes;
  }
}

export { FetchEventTypesService };
