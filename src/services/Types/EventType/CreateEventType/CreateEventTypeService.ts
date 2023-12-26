import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { EventType } from '@entities/EventType/EventType';
import { AppError } from '@utils/AppError';
import { IEventTypeRepository } from '@repositories/EventTypeRepository/IEventTypeRepository';
import { ICreateEventTypeDTO } from './ICreateEventTypeServiceDTO';

@injectable()
class CreateEventTypeService {
  constructor(
    @inject('EventTypeRepository')
    private eventTypeRepository: IEventTypeRepository,
  ) {}

  async execute({ name, verified }: ICreateEventTypeDTO): Promise<EventType> {
    const type = await this.eventTypeRepository.findByName(name);

    if (type) {
      throw new AppError('Tipo de evento já cadastrado.', 400);
    }

    const eventType = this.eventTypeRepository.create({
      id: v4(),
      name,
    });

    if (verified !== null && verified !== undefined)
      eventType.verified = verified;

    await this.eventTypeRepository.save(eventType);

    return eventType;
  }
}

export { CreateEventTypeService };
