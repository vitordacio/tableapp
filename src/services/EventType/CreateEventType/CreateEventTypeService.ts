import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { EventType } from '@entities/EventType/EventType';
import { IEventTypeRepository } from '@repositories/EventTypeRepository/IEventTypeRepository';
import { AppError } from '@utils/AppError';
import { ICreateEventTypeDTO } from './CreateEventTypeServiceDTO';

@injectable()
class CreateEventTypeService {
  constructor(
    @inject('EventTypeRepository')
    private eventTypeRepository: IEventTypeRepository,
  ) {}

  async execute({ type, type_name }: ICreateEventTypeDTO): Promise<EventType> {
    const foundEventType = await this.eventTypeRepository.findByType(type);

    if (foundEventType) {
      throw new AppError('Tipo já cadastrado.', 400);
    }

    const eventType = this.eventTypeRepository.create({
      id: v4(),
      type,
      type_name,
    });

    await this.eventTypeRepository.save(eventType);

    return eventType;
  }
}

export { CreateEventTypeService };
