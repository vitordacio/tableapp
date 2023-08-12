// import { Brackets, getRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';
import { IEvent } from '@entities/Event/IEvent';
import { Event } from '@entities/Event/Event';
import { IEventRepository } from '../IEventRepository';

class EventRepository implements IEventRepository {
  private ormRepository: Repository<Event>;

  constructor() {
    this.ormRepository = getRepository(Event);
  }

  create(data: IEvent): Event {
    const event = this.ormRepository.create({
      id_event: data.id,
      type_id: data.type_id,
      owner_id: data.owner_id,
      name: data.name,
      location: data.location,
      time: data.time,
      club_name: data.club_name,
      performer: data.performer,
      additional: data.additional,
      drink_preferences: data.drink_preferences,
      age_limit: data.age_limit,
      free_woman: data.free_woman,
      free_man: data.free_man,
    });

    return event;
  }

  async save(event: Event): Promise<Event> {
    const newEvent = await this.ormRepository.save(event);

    return newEvent;
  }

  async findById(id: string): Promise<Event | undefined> {
    const event = await this.ormRepository.findOne({
      relations: ['type', 'address', 'owner', 'participations'],
      where: { id_event: id },
    });

    return event;
  }

  async findByIdAndType(id: string, type: string): Promise<Event | undefined> {
    const event = await this.ormRepository.findOne({
      relations: ['participations', 'type'],
      where: { id_event: id, type: { type } },
    });

    return event;
  }

  async findIndexByType(type: string): Promise<Event[]> {
    const events = await this.ormRepository.find({
      relations: ['type', 'participations'],
      where: { type: { type } },
      order: { created_at: 'DESC' },
    });

    return events;
  }

  async findIndex(): Promise<Event[]> {
    const events = await this.ormRepository.find({
      relations: ['type', 'participations'],
      order: { created_at: 'DESC' },
    });

    return events;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async remove(entitie: Event): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { EventRepository };
