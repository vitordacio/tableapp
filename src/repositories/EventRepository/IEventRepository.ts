import { IEvent } from '../../entities/Event/IEvent';
import { Event } from '../../entities/Event/Event';

export interface IEventRepository {
  save(event: Event): Promise<Event>;
  create(data: IEvent): Event;
  findById(id: string): Promise<Event | undefined>;
  findByIdAndType(id: string, type: string): Promise<Event | undefined>;
  findIndexByType(type: string): Promise<Event[]>;
  findIndex(): Promise<Event[]>;
  delete(id: string): Promise<void>;
  remove(entitie: Event): Promise<void>;
}
