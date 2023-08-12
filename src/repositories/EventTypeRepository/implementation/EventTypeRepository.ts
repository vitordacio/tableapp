// import { Brackets, getRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';
import { EventType } from '@entities/EventType/EventType';
import { IEventType } from '@entities/EventType/IEventType';
import { IEventTypeRepository } from '../IEventTypeRepository';

class EventTypeRepository implements IEventTypeRepository {
  private ormRepository: Repository<EventType>;

  constructor() {
    this.ormRepository = getRepository(EventType);
  }

  create(data: IEventType): EventType {
    const event = this.ormRepository.create({
      id_event_type: data.id,
      type: data.type,
      type_name: data.type_name,
    });

    return event;
  }

  async save(event: EventType): Promise<EventType> {
    const newEventType = await this.ormRepository.save(event);

    return newEventType;
  }

  async findById(id: string): Promise<EventType | undefined> {
    const eventType = await this.ormRepository.findOne({
      where: { id_event_type: id },
    });

    return eventType;
  }

  async findIndex(): Promise<EventType[]> {
    const eventsTypes = await this.ormRepository.find({
      order: { created_at: 'DESC' },
    });

    return eventsTypes;
  }

  async findByType(type: string): Promise<EventType | undefined> {
    const eventType = await this.ormRepository.findOne({
      where: { type },
    });

    return eventType;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async remove(entitie: EventType): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { EventTypeRepository };
