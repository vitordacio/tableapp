import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { EventType } from '@entities/EventType/EventType';
import { AppError } from '@utils/AppError';
import { IEventTypeRepository } from '@repositories/EventTypeRepository/IEventTypeRepository';
import { ICreateEventTypeDTO } from './CreateEventTypeServiceDTO';

@injectable()
class CreateEventTypeService {
  constructor(
    @inject('EventTypeRepository')
    private eventTypeRepository: IEventTypeRepository,
  ) {}

  async execute({
    name,
    free_access,
  }: ICreateEventTypeDTO): Promise<EventType> {
    const type = await this.eventTypeRepository.findByName(name);

    if (type) {
      throw new AppError('Tipo de evento já cadastrado.', 400);
    }

    const eventType = this.eventTypeRepository.create({
      id: v4(),
      name,
    });

    if ((free_access as unknown as string).length !== 0)
      eventType.free_access = free_access as boolean;

    await this.eventTypeRepository.save(eventType);

    return eventType;
  }
}

export { CreateEventTypeService };
