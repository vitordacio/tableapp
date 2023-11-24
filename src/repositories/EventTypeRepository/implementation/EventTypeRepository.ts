// import { Brackets, getRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';
import { IEventType } from '@entities/EventType/IEventType';
import { EventType } from '@entities/EventType/EventType';
import { IEventTypeRepository } from '../IEventTypeRepository';

class EventTypeRepository implements IEventTypeRepository {
  private ormRepository: Repository<EventType>;

  constructor() {
    this.ormRepository = getRepository(EventType);
  }

  create(data: IEventType): EventType {
    const eventType = this.ormRepository.create({
      id_event_type: data.id,
      name: data.name.toLowerCase(),
      count: data.count,
      free_access: data.free_access,
    });

    return eventType;
  }

  async save(event: EventType): Promise<EventType> {
    const newEventType = await this.ormRepository.save(event);

    return newEventType;
  }

  async findByName(name: string): Promise<EventType | undefined> {
    const eventType = await this.ormRepository.findOne({
      where: { name: name.toLowerCase() },
    });

    return eventType;
  }

  async findById(id: string): Promise<EventType | undefined> {
    const eventType = await this.ormRepository.findOne({
      where: { id_event_type: id },
    });

    return eventType;
  }

  async findIndex(): Promise<EventType[]> {
    const eventType = await this.ormRepository.find({
      order: { count: 'DESC' },
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
